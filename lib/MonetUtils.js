/**
	@class MonetUtils
	@desc
		Optional Monet utilities.
*/
import { MediaEvent } from 'ad-events'

var MonetUtils = new function() {
	var id = 'MonetUtils';
	var M = this;

	var videos = {};

	/**
		@memberOf MonetUtils
		@method addYouTubeVideoMetrics
		@param {VideoPlayer} player
			The video player instance to track
		@desc
			Adds Monet/Ichnaea tracking for YouTube video players.
		@example
			MonetUtils.addYouTubeVideoMetrics( adData.elements.mainYouTubePlayer );
	*/
	M.addYouTubeVideoMetrics = function( videoPlayer ) {
		trace( id + '.addYouTubeVideoMetrics()' );
		var videoId = new Date().getTime() + '_' + Math.floor( Math.random() * 100000000 );

		videoPlayer.screen.addEventListener( MediaEvent.PLAY, function() {
			handleVideoPlay( videoId );
		});
		videoPlayer.screen.addEventListener( MediaEvent.AUTOPLAY, function() {
			handleVideoPlay( videoId, true );
		});
		videoPlayer.screen.addEventListener( MediaEvent.PAUSE, function() {
			handleVideoPause( videoId );
		});
		videoPlayer.screen.addEventListener( MediaEvent.STOP, function() {
			handleVideoStop( videoId );
		});
		videoPlayer.screen.addEventListener( MediaEvent.PROGRESS, function() {
			handleVideoProgress( videoId );
		});
		videoPlayer.screen.addEventListener( MediaEvent.MUTE, function() {
			handleVideoSound( videoId, 0 );
		});
		videoPlayer.screen.addEventListener( MediaEvent.UNMUTE, function() {
			handleVideoSound( videoId, -1 );
		});
		videoPlayer.screen.addEventListener( MediaEvent.COMPLETE, function() {
			handleVideoComplete( videoId );
		});
		videos[ videoId ] = {
			player: videoPlayer,
			progress: {
				start: false,
				quarter: false,
				half: false,
				threeQuarter: false,
				complete: false
			},
			isActive: false
		};
	}
	function handleVideoPlay( videoId, isAutoPlay ) {
		Monet.logEvent( 'VIDEO_PLAY', {
			url: videos[ videoId ].player.url,
			pos: Math.round( videos[ videoId ].player.currentTime * 1000 ),
			auto: isAutoPlay || false
		});
	}
	function handleVideoPause( videoId ) {
		Monet.logEvent( 'VIDEO_PAUSE', {
			url: videos[ videoId ].player.url,
			pos: Math.round( videos[ videoId ].player.currentTime * 1000 ),
		});
	}
	function handleVideoStop( videoId ) {
		Monet.logEvent( 'VIDEO_STOP', {
			url: videos[ videoId ].player.url,
			pos: Math.round( videos[ videoId ].player.currentTime * 1000 ),
		});
	}
	function handleVideoProgress( videoId ) {
		var percentComplete = videos[ videoId ].player.currentTime / videos[ videoId ].player.duration;

		if( !videos[ videoId ].isActive && percentComplete > 0 ) {
			videos[ videoId ].isActive = true;
			// reset all the progress
			videos[ videoId ].progress.start = false;
			videos[ videoId ].progress.quarter = false;
			videos[ videoId ].progress.half = false;
			videos[ videoId ].progress.threeQuarter = false;
			videos[ videoId ].progress.complete = false;
		}

		if( percentComplete > 0 && !videos[ videoId ].progress.start ) {
			videos[ videoId ].progress.start = true;
		}
		else if( percentComplete >= 0.25 && !videos[ videoId ].progress.quarter ) {
			videos[ videoId ].progress.quarter = true;
			Monet.logEvent( 'VIDEO_FIRST_QUART', {
				url: videos[ videoId ].player.url,
				pos: Math.round( videos[ videoId ].player.currentTime * 1000 ),
			});
		}
		else if( percentComplete >= 0.5 && !videos[ videoId ].progress.half ) {
			videos[ videoId ].progress.half = true;
			Monet.logEvent( 'VIDEO_SECOND_QUART', {
				url: videos[ videoId ].player.url,
				pos: Math.round( videos[ videoId ].player.currentTime * 1000 ),
			});
		}
		else if( percentComplete >= 0.75 && !videos[ videoId ].progress.threeQuarter ) {
			videos[ videoId ].progress.threeQuarter = true;
			Monet.logEvent( 'VIDEO_THIRD_QUART', {
				url: videos[ videoId ].player.url,
				pos: Math.round( videos[ videoId ].player.currentTime * 1000 ),
			});
		}
	}
	function handleVideoComplete( videoId ) {
		videos[ videoId ].isActive = false;
		Monet.logEvent( 'VIDEO_COMPLETE', {
			url: videos[ videoId ].player.url,
			pos: Math.round( videos[ videoId ].player.currentTime * 1000 ),
		});
	}
	function handleVideoSound( videoId, level ) {
		Monet.logEvent( 'VIDEO_SOUND', {
			url: videos[ videoId ].player.url,
			pos: Math.round( videos[ videoId ].player.currentTime * 1000 ),
			level: level
		});
	}

}

export default MonetUtils