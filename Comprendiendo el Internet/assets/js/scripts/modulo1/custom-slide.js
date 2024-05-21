$(() => {
    const ARROW_HALF_WIDTH = 25;
    const ARROW_HALF_HEIGHT = 25;
    $(".cs-container").each((i, container) => {
        /* Properties */
        container.current = null;
        container.currentIndex = -1;
        container.slides = $(container).children(".custom-slide");
        container.slidesAmount = container.slides.length;
  
        /* Functions */
        // Matches container's height to its current slide.
        container.ToCurrentHeight = () => {
            if (container.current === null) return;
            $(container).height($(container.current).height());
        };
        // Sets the current slide.
        container.ToSlide = (slideIndex) => {
            if (container.slidesAmount === 0) return;
            if (slideIndex >= container.slidesAmount)
                slideIndex = 0;
            else if (slideIndex < 0)
                slideIndex = container.slidesAmount - 1;
            
            container.currentIndex = slideIndex;
            $(container.current).removeClass("visible");
            container.current = container.slides[slideIndex];
            $(container.current).addClass("visible");
            container.ToCurrentHeight();
  
            $(".cs-footer > p").text(`${slideIndex + 1}/${container.slidesAmount}`);
        }
        // Changes to next slide.
        $(container).children(".cs-next").click((e) => {
            container.ToSlide(container.currentIndex + 1);
            $(".cs-next-tip").addClass("hide");
        });
        // Changes to previous slide.
        $(container).children(".cs-previous").click((e) => {
            container.ToSlide(container.currentIndex - 1);
        });
        // Changes cursor to arrow inside the Next area.
        $(container).children(".cs-next").each((i, next) => {
            $(next).mouseenter((e) => {
                $(container).children(".cs-next-arrow").addClass("visible");
            });
            $(next).mouseleave((e) => {
                $(container).children(".cs-next-arrow").removeClass("visible");
            });
            $(next).mousemove((e) => {
                const x = container.getBoundingClientRect().x;
                $(container).children(".cs-next-arrow")
                    .css("top", `${(e.offsetY - ARROW_HALF_HEIGHT) / $(container).height() * 100}%`)
                    .css("left", `${(e.screenX - x - ARROW_HALF_WIDTH) / $(container).width() * 100}%`);
            });
        });
        // Changes cursor to arrow inside the Previous area.
        $(container).children(".cs-previous").each((i, prev) => {
            $(prev).mouseenter((e) => {
                $(container).children(".cs-previous-arrow").addClass("visible");
            });
            $(prev).mouseleave((e) => {
                $(container).children(".cs-previous-arrow").removeClass("visible");
            });
            $(prev).mousemove((e) => {
                const x = container.getBoundingClientRect().x;
                $(container).children(".cs-previous-arrow")
                    .css("top", `${(e.offsetY - ARROW_HALF_HEIGHT) / $(container).height() * 100}%`)
                    .css("left", `${(e.screenX - x - ARROW_HALF_WIDTH) / $(container).width() * 100}%`);
            });
        });
  
        /* Setup */
        // Sets first child as current.
        if (container.slidesAmount > 0) container.ToSlide(0);
        // Update's container's heigth to match its current slide.
        container.ToCurrentHeight();
    });
    // Resizes each container when the screen size is changed.
    $(window).resize(() => {
        $(".cs-container").each((i, container) => {
            if (container.current)
                $(container).height($(container.current).height());
        });
    });
  });