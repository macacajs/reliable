'use strict';

const assert = require('power-assert');

const gen = require('../../../lib/ios/gen');
const cheerio = require('cheerio');

describe('lib/ios/gen', () => {
  it('should gen download html', () => {
    const html = gen.genDownloadHtml({
      plistUrl: 'http://soap-gaz',
    });
    const $ = cheerio.load(html);
    assert($('a').attr('href') === 'itms-services://?action=download-manifest&url=http://soap-gaz');
    assert($('a > h1').html() === 'click to download');
  });

  it('should gen plist', () => {
    const html = gen.genPlist({
      url: 'http://soap-gaz',
      bundleIdentifier: 'm14',
      bundleVersion: 'aug',
      title: 'mw',
    });
    assert(html.includes('<string>http://soap-gaz</string>'));
    assert(html.includes('<string>m14</string>'));
    assert(html.includes('<string>aug</string>'));
    assert(html.includes('<string>mw</string>'));
  });
});
