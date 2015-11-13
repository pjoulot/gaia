/* global require, marionette, setup, test */
'use strict';

var assert = require('assert');
var Music = require('./lib/music.js');


marionette('Music views', function() {
  var client = marionette.client({
    profile: {
      prefs: {
        'device.storage.enabled': true,
        'device.storage.testing': true,
        'device.storage.prompt.testing': true
      },
    }
  });

  var music;

  setup(function() {
    music = new Music(client);
    client.fileManager.removeAllFiles();
    client.fileManager.add([
      {
        type: 'music',
        filePath: 'apps/music/test-data/playlists/01.ogg'
      },
      {
        type: 'music',
        filePath: 'apps/music/test-data/playlists/02.ogg'
      },
      {
        type: 'music',
        filePath: 'apps/music/test-data/playlists/03.ogg'
      },
      {
        type: 'music',
        filePath: 'apps/music/test-data/playlists/a.ogg'
      },
      {
        type: 'music',
        filePath: 'apps/music/test-data/playlists/b.ogg'
      },
      {
        type: 'music',
        filePath: 'apps/music/test-data/playlists/c.ogg'
      },
      {
        type: 'music',
        filePath: 'apps/music/test-data/playlists/w.ogg'
      },
      {
        type: 'music',
        filePath: 'apps/music/test-data/playlists/x.ogg'
      },
      {
        type: 'music',
        filePath: 'apps/music/test-data/playlists/y.ogg'
      },
    ]);

    music.launch();
    music.waitForFirstTile();
  });


  test('Check tile view', function() {
    try {
      client.switchToFrame(music.homeViewFrame);
      var tile = client.findElement(Music.Selector.firstTile);
      assert.ok(tile);
      tile.tap();
      music.switchToMe();

      music.waitForPlayerView();
    } catch(e) {
      assert.ok(false, e.stack);
    }
  });

});
