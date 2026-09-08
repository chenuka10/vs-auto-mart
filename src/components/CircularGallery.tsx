'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  image: string;
  text: string;
}

interface SlidingGalleryProps {
  items: GalleryItem[];
}

export default function CircularGallery({
  items,
}: SlidingGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollEndTimeout = useRef<number>();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // We clone the first and last cards:
  //
  // [LAST] [1] [2] [3] [4] [FIRST]
  //
  // This allows the carousel to visually move beyond either end,
  // then silently jump back to the real position once scrolling settles.

  const hasLoop = items.length > 1;

  const loopItems = hasLoop
    ? [items[items.length - 1], ...items, items[0]]
    : items;

  /**
   * Get the real card index from the cloned-track index.
   */
  const getRealIndex = useCallback(
    (trackIndex: number) => {
      if (!hasLoop) return trackIndex;
      if (trackIndex === 0) return items.length - 1;
      if (trackIndex === items.length + 1) return 0;
      return trackIndex - 1;
    },
    [hasLoop, items.length]
  );

  /**
   * Find the cloned-track index closest to the current scroll position.
   */
  const getClosestTrackIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;

    const cards = Array.from(track.children) as HTMLElement[];
    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const distance = Math.abs(card.offsetLeft - track.scrollLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }, []);

  /**
   * Update active dot based on the current track position.
   */
  const updateActiveIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track || !track.children.length) {
      setActiveIndex(0);
      return;
    }
    setActiveIndex(getRealIndex(getClosestTrackIndex()));
  }, [getRealIndex, getClosestTrackIndex]);

  /**
   * Jump to a cloned-track index instantly, bypassing the CSS
   * `scroll-smooth` behavior so the reset isn't visible.
   */
  const jumpToTrackIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.children[index] as HTMLElement | undefined;
    if (!card) return;

    const previousBehavior = track.style.scrollBehavior;
    track.style.scrollBehavior = 'auto';
    track.scrollLeft = card.offsetLeft;

    requestAnimationFrame(() => {
      track.style.scrollBehavior = previousBehavior;
    });
  }, []);

  /**
   * Scroll to a specific cloned-track index (animated).
   */
  const scrollToTrackIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.children[index] as HTMLElement | undefined;
    if (!card) return;

    track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
  }, []);

  /**
   * Initialize the carousel on the first REAL card.
   *
   * Because index 0 is the cloned last card,
   * the first real card is index 1.
   */
  useEffect(() => {
    if (hasLoop) {
      requestAnimationFrame(() => jumpToTrackIndex(1));
    } else {
      requestAnimationFrame(() => jumpToTrackIndex(0));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasLoop]);

  /**
   * After scrolling settles (debounced), check if we landed on a
   * cloned card. If so, silently snap back to the matching real card.
   */
  const handleScrollEnd = useCallback(() => {
    if (!hasLoop) return;

    const closestIndex = getClosestTrackIndex();

    if (closestIndex === 0) {
      // Landed on the cloned LAST card -> snap to the real last card.
      jumpToTrackIndex(items.length);
    } else if (closestIndex === items.length + 1) {
      // Landed on the cloned FIRST card -> snap to the real first card.
      jumpToTrackIndex(1);
    }
  }, [hasLoop, items.length, getClosestTrackIndex, jumpToTrackIndex]);

  /**
   * Keep the active dot synchronized with scrolling, and detect
   * scroll-end (via debounce, since native scroll has no "end" event
   * in most browsers) to trigger the loop reset.
   */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateActiveIndex();

    const handleScroll = () => {
      updateActiveIndex();
      window.clearTimeout(scrollEndTimeout.current);
      scrollEndTimeout.current = window.setTimeout(handleScrollEnd, 120);
    };

    track.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      track.removeEventListener('scroll', handleScroll);
      window.clearTimeout(scrollEndTimeout.current);
    };
  }, [updateActiveIndex, handleScrollEnd]);

  /**
   * Keep card positions correct after resizing.
   */
  useEffect(() => {
    const handleResize = () => {
      const targetIndex = hasLoop ? activeIndex + 1 : activeIndex;
      requestAnimationFrame(() => jumpToTrackIndex(targetIndex));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeIndex, hasLoop, jumpToTrackIndex]);

  /**
   * Move one card left/right. Wrapping past either end is now handled
   * automatically by handleScrollEnd once the animation settles.
   */
  const scrollByCard = useCallback(
    (direction: 'left' | 'right') => {
      const track = trackRef.current;
      if (!track || items.length <= 1 || isTransitioning) return;

      const currentTrackIndex = getClosestTrackIndex();
      const nextTrackIndex =
        direction === 'right' ? currentTrackIndex + 1 : currentTrackIndex - 1;

      const cards = Array.from(track.children) as HTMLElement[];
      const targetCard = cards[nextTrackIndex];
      if (!targetCard) return;

      setIsTransitioning(true);
      track.scrollTo({ left: targetCard.offsetLeft, behavior: 'smooth' });

      // Give smooth scrolling (and the subsequent debounced reset)
      // enough time to finish before allowing another click.
      window.setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning, items.length, getClosestTrackIndex]
  );

  /**
   * Jump to a real item from the pagination dots.
   */
  const scrollToIndex = useCallback(
    (index: number) => {
      scrollToTrackIndex(hasLoop ? index + 1 : index);
    },
    [hasLoop, scrollToTrackIndex]
  );

  /**
   * Keyboard controls.
   */
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      scrollByCard('left');
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      scrollByCard('right');
    }
    if (event.key === 'Home') {
      event.preventDefault();
      scrollToIndex(0);
    }
    if (event.key === 'End') {
      event.preventDefault();
      scrollToIndex(items.length - 1);
    }
  };

  if (!items.length) return null;

  return (
    <div className="group relative w-full" role="region" aria-label="Gallery">
      {/* GALLERY TRACK */}
      <div
        ref={trackRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="
          flex gap-4 overflow-x-auto pb-3
          snap-x snap-mandatory scroll-smooth scrollbar-hide outline-none
          focus-visible:ring-2 focus-visible:ring-brass-500/60
          focus-visible:ring-offset-2 focus-visible:ring-offset-graphite-950
        "
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {loopItems.map((item, index) => (
          <article
            key={`${item.image}-${index}`}
            className="
              group/card relative shrink-0
              w-[82%] sm:w-[48%] lg:w-[31.5%]
              snap-start overflow-hidden rounded-2xl
              border border-graphite-700/40 bg-graphite-950
              shadow-lg shadow-black/20
              transition-all duration-500
              hover:-translate-y-1 hover:border-brass-500/40
              hover:shadow-xl hover:shadow-black/30
            "
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-graphite-900">
              <img
                src={item.image}
                alt={item.text}
                loading={index < 3 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
                className="
                  h-full w-full object-cover
                  transition-transform duration-700 ease-out
                  group-hover/card:scale-105
                "
              />
              <div
                className="
                  pointer-events-none absolute inset-0
                  bg-gradient-to-t from-black/50 via-black/5 to-transparent
                  opacity-80
                "
              />
              <div
                className="
                  absolute bottom-0 left-0 h-[2px] w-0 bg-brass-500
                  transition-all duration-500 group-hover/card:w-full
                "
              />
            </div>

            <div className="relative px-4 py-3.5">
              <p
                className="
                  font-display text-sm font-medium leading-5 text-paper
                  transition-colors duration-300
                  group-hover/card:text-brass-400
                "
              >
                {item.text}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* PREVIOUS BUTTON */}
      {items.length > 1 && (
        <button
          type="button"
          aria-label="Previous gallery item"
          onClick={() => scrollByCard('left')}
          className="
            absolute left-2 top-[42%] flex h-10 w-10 -translate-y-1/2
            items-center justify-center rounded-full
            border border-white/10 bg-graphite-950/85 text-paper
            shadow-lg backdrop-blur-md
            transition-all duration-300
            hover:scale-105 hover:border-brass-500/50 hover:bg-graphite-900 hover:text-brass-400
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-500
            sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100
          "
        >
          <ChevronLeft size={19} strokeWidth={1.8} />
        </button>
      )}

      {/* NEXT BUTTON */}
      {items.length > 1 && (
        <button
          type="button"
          aria-label="Next gallery item"
          onClick={() => scrollByCard('right')}
          className="
            absolute right-2 top-[42%] flex h-10 w-10 -translate-y-1/2
            items-center justify-center rounded-full
            border border-white/10 bg-graphite-950/85 text-paper
            shadow-lg backdrop-blur-md
            transition-all duration-300
            hover:scale-105 hover:border-brass-500/50 hover:bg-graphite-900 hover:text-brass-400
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-500
            sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100
          "
        >
          <ChevronRight size={19} strokeWidth={1.8} />
        </button>
      )}

      {/* PAGINATION DOTS */}
      {items.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-1.5" aria-label="Gallery pagination">
          {items.map((item, index) => (
            <button
              key={`${item.image}-dot-${index}`}
              type="button"
              aria-label={`Go to gallery item ${index + 1}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              onClick={() => scrollToIndex(index)}
              className={`
                h-1.5 rounded-full transition-all duration-300
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-500
                focus-visible:ring-offset-2 focus-visible:ring-offset-graphite-950
                ${
                  index === activeIndex
                    ? 'w-6 bg-brass-500'
                    : 'w-1.5 bg-graphite-700 hover:w-3 hover:bg-graphite-500'
                }
              `}
            />
          ))}
        </div>
      )}

      {/* Screen reader status */}
      <span className="sr-only" aria-live="polite">
        Showing gallery item {activeIndex + 1} of {items.length}
      </span>
    </div>
  );
}