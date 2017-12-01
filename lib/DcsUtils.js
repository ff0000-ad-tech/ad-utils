/**
	@class DcsUtils
	@desc
		Doubleclick Studio utilities.
*/
var DcsUtils = new function() {

	var D = this;

	D.counterWithVars = function( str, impression ) {
		if (impression) Enabler.reportCustomVariableCount1( str );
		else Enabler.reportCustomVariableCount2( str );
	}


	/**
		@memberOf DcsUtils
		@method addVideoMetrics
		@param {VideoPlayer} player 
			The video player instance to track
		@param {string} message
			The message passed as the metric, defaults to 'Video Report 1'
		@desc
			Adds DoubleClick Tracking metrics to a video player.
		@example
			DcsUtils.addVideoMetrics( adData.elements.videoPlayer, 'Intro Video' );
	*/
	D.addVideoMetrics = function( player, message ) {
		Enabler.loadModule(studio.module.ModuleId.VIDEO, function() {
			studio.video.Reporter.attach(
				message || 'Video Report 1',
				player instanceof VideoPlayer ? player.screen : player
			);
		});
	}



	/**
		@memberOf DcsUtils
		@method addYouTubeVideoMetrics
		@param {VideoPlayer} player 		- The YouTubePlayer instance to track
		@desc
			Adds DoubleClick Tracking metrics to a YouTube video player.  The Enabler counter calls are added to the index when
			a YouTubePlayer is added through Ad App.
			<br><br>

			If manually adding a YouTubePlayer/tracking, the required global vars are:<br>
			<codeblock>
				var trackVideoPlay = function() {
					Enabler.counter( 'YTP Video Play', true )
				}
				var trackVideoReplay = function() {
					Enabler.counter( 'YTP Video Replay', true )
				}
				var trackVideoPause = function() {
					Enabler.counter( 'YTP Video Pause', true )
				}
				var trackVideoComplete = function() {
					Enabler.counter( 'YTP Video Complete', true )
				}
			</codeblock>
			<br><br>

		@example
			DcsUtils.addYouTubeVideoMetrics( adData.elements.mainYouTubePlayer );
	*/
	D.addYouTubeVideoMetrics = function( player ) {
		var p = player.screen;
		
		p.addEventListener( MediaEvent.PLAY, function() {
			player.isReplay ? trackVideoReplay.call() : trackVideoPlay.call();
		});
		
		p.addEventListener( MediaEvent.PAUSE, function() {
			if ( !player.complete ) {
				trackVideoPause.call();
			}
		});
		
		p.addEventListener( MediaEvent.COMPLETE, function() {
			trackVideoComplete.call();
		});
	}

}