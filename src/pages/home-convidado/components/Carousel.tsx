import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

/* Root */
export const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { opts?: any }
>(({ className, children, opts, ...props }, ref) => {
  const [emblaRef] = useEmblaCarousel(opts);
  return (
    <div className={cn("relative", className)} ref={ref} {...props}>
      <div ref={emblaRef} className="overflow-hidden">
        {children}
      </div>
    </div>
  );
});
Carousel.displayName = "Carousel";

/* Content */
export const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div className={cn("flex gap-4", className)} ref={ref} {...props}>
      {children}
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

/* Item */
export const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { className?: string }
>(({ className, children, ...props }, ref) => {
  return (
    <div className={cn("flex-none", className)} ref={ref} {...props}>
      {children}
    </div>
  );
});
CarouselItem.displayName = "CarouselItem";

/* Buttons */
export const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => (
  <button
    {...props}
    ref={ref}
    className={cn(
      "absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md z-10",
      props.className
    )}
  />
));
CarouselPrevious.displayName = "CarouselPrevious";

export const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => (
  <button
    {...props}
    ref={ref}
    className={cn(
      "absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md z-10",
      props.className
    )}
  />
));
CarouselNext.displayName = "CarouselNext";
