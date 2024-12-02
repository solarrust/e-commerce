/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useCallback } from "react";
import Link from "next/link";
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

import { Product } from "@/lib/models/ProductModel";

import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./CarouselArrowButtons";
import { DotButton, useDotButton } from "./CarouselDotButton";

import styles from "./Carousel.module.css";

export default function Carousel(props: {
  slides: Product[];
  options: EmblaOptionsType;
}) {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onNavButtonClick);

  return (
    <section className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((product, index) => (
            <div
              key={product._id}
              id={index.toString()}
              className={styles.embla__slide}
            >
              <Link href={`/product/${product.slug}`}>
                <img src={product.banner || product.image} alt={product.name} />
              </Link>
            </div>
          ))}
        </div>
        <div className={styles.embla__controls}>
          <div className={styles.embla__buttons}>
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>

          <div className={styles.embla__dots}>
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={`${styles.embla__dot} ${index === selectedIndex ? styles["embla__dot--selected"] : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
