$(document).ready(function() {
    const apiUrl = "https://picsum.photos/v2/list?page=1&limit=20"; 
    let currentImageIndex = 0;
    let images = [];

    // Fetch images from the Lorem Picsum API
    $.get(apiUrl, function(data) {
        images = data;
        renderGallery();
    });

    // Render gallery images
    function renderGallery() {
        const gallery = $("#image-gallery");
        gallery.empty(); // Clear existing images

        images.forEach((image, index) => {
            const imgElement = $("<img>")
                .attr("src", image.download_url)
                .attr("alt", `Image ${index + 1}`)
                .attr("data-index", index)
                .addClass("gallery-image")
                .on("click", openModal);
            gallery.append(imgElement);
        });

        // Trigger fade-in animation when images load or scroll into view
        $(window).on("scroll", function() {
            $(".gallery-image").each(function() {
                const imgOffset = $(this).offset().top;
                const windowHeight = $(window).height();
                const scrollTop = $(window).scrollTop();

                if (imgOffset < scrollTop + windowHeight - 100) {
                    $(this).css("opacity", "1");
                    $(this).css("transform", "scale(1)");
                }
            });
        });
    }

    // Open Modal for clicked image
    function openModal() {
        currentImageIndex = $(this).data("index");
        const imageUrl = images[currentImageIndex].download_url;

        // Set modal image
        $("#modalImage").attr("src", imageUrl);

        // Show modal
        $("#imageModal").fadeIn();
    }

    // Close modal
    $("#closeBtn, #backBtn").on("click", function() {
        $("#imageModal").fadeOut();
    });

    // Next button functionality
    $("#nextBtn").on("click", function() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        const imageUrl = images[currentImageIndex].download_url;
        $("#modalImage").attr("src", imageUrl);
    });

    // Previous button functionality
    $("#prevBtn").on("click", function() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        const imageUrl = images[currentImageIndex].download_url;
        $("#modalImage").attr("src", imageUrl);
    });

    // Like button functionality
    $("#likeBtn").on("click", function() {
        alert("You liked this image!");
    });
});
