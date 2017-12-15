/* jshint esversion: 6 */

// mediaplayer.js overides
$('#mediaplayer').mediaelementplayer({
  stretching: 'responsive',
  features: ['playpause', 'current', 'progress', 'duration', 'volume', 'fullscreen'],
});

// video and transcript DOM constants
const video = document.querySelector('video');
const transcriptSpan = document.querySelectorAll('#interactiveTranscript span');

// This event listener waits until the browser has chosen which video source file to load.
// Then it finds the duration of the loaded video and saves it to memory.
video.addEventListener('loadeddata', function() {
  if (video.readyState > 0) {
    return video.duration;
  }
});

// This event listener watches the videos time frame progression.
// Then it highlights the transcript span text that has the same time frame range.
video.ontimeupdate = function() {
  for (let i = 0; i < transcriptSpan.length; i++) {
    const span = transcriptSpan[i];
    const captionStart = parseFloat(span.getAttribute('data-captionStart'));
    const captionEnd = parseFloat(span.getAttribute('data-captionEnd'));
    if (video.currentTime >= captionStart && video.currentTime < captionEnd) {
      span.classList.add("highlight");
    } else {
      span.classList.remove("highlight");
    }
  }
};

// This event listener watches for mouse clicks on the transcript span.
// Then if the start time of the transcript span is within valid range of the video, it will jump to that point in the video and play.
$(transcriptSpan).click(function(event) {
  const captionStart = parseFloat(event.target.getAttribute('data-captionStart'));
  if (captionStart >= 0 && captionStart < video.duration) {
    video.setCurrentTime(captionStart);
    video.play();
  } else {
    alert('Start time is out of range for the video');
  }
});
