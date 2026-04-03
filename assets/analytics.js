// ===================================
// LIGHTWEIGHT ANALYTICS TRACKER
// Tracks page views, visitors, sections,
// referrers, devices — all in localStorage.
// No external service needed.
// ===================================
(function () {
  'use strict';

  var ANALYTICS_KEY = 'portfolio_analytics';
  var VISITOR_KEY = 'portfolio_visitor_id';
  var SESSION_KEY = 'portfolio_session';
  var MAX_DAYS = 90; // keep 90 days of data

  function getVisitorId() {
    var id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = 'v_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  }

  function getSessionId() {
    var s = sessionStorage.getItem(SESSION_KEY);
    if (!s) {
      s = 's_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6);
      sessionStorage.setItem(SESSION_KEY, s);
    }
    return s;
  }

  function today() {
    return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  }

  function hourNow() {
    return new Date().getHours();
  }

  function getAnalytics() {
    try {
      var raw = localStorage.getItem(ANALYTICS_KEY);
      return raw ? JSON.parse(raw) : createEmpty();
    } catch (e) {
      return createEmpty();
    }
  }

  function createEmpty() {
    return {
      version: 1,
      days: {},       // { "2025-04-03": { views: 5, visitors: ["v1","v2"], sessions: 3, ... } }
      referrers: {},   // { "google.com": 3, "direct": 10 }
      devices: { mobile: 0, tablet: 0, desktop: 0 },
      browsers: {},    // { "Chrome": 5, "Safari": 2 }
      pages: {},       // { "#projects": 4, "#experience": 2 }
      hours: {}        // { "14": 5, "15": 3 }  — traffic by hour
    };
  }

  function save(data) {
    // Prune old days
    var keys = Object.keys(data.days).sort();
    while (keys.length > MAX_DAYS) {
      delete data.days[keys.shift()];
    }
    try {
      localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('[Analytics] localStorage quota exceeded');
    }
  }

  function detectDevice() {
    var ua = navigator.userAgent;
    if (/Mobi|Android.*Mobile|iPhone|iPod/.test(ua)) return 'mobile';
    if (/iPad|Android(?!.*Mobile)|Tablet/.test(ua)) return 'tablet';
    return 'desktop';
  }

  function detectBrowser() {
    var ua = navigator.userAgent;
    if (ua.indexOf('Firefox') > -1) return 'Firefox';
    if (ua.indexOf('Edg') > -1) return 'Edge';
    if (ua.indexOf('OPR') > -1 || ua.indexOf('Opera') > -1) return 'Opera';
    if (ua.indexOf('Chrome') > -1) return 'Chrome';
    if (ua.indexOf('Safari') > -1) return 'Safari';
    return 'Autre';
  }

  function getReferrerDomain() {
    if (!document.referrer) return 'direct';
    try {
      var host = new URL(document.referrer).hostname;
      if (host === location.hostname) return 'interne';
      // Clean common search engines
      if (host.indexOf('google') > -1) return 'google';
      if (host.indexOf('bing') > -1) return 'bing';
      if (host.indexOf('yahoo') > -1) return 'yahoo';
      if (host.indexOf('linkedin') > -1) return 'linkedin';
      if (host.indexOf('facebook') > -1 || host.indexOf('fb.') > -1) return 'facebook';
      if (host.indexOf('twitter') > -1 || host.indexOf('t.co') > -1) return 'twitter';
      if (host.indexOf('github') > -1) return 'github';
      return host;
    } catch (e) {
      return 'direct';
    }
  }

  function trackPageView() {
    var data = getAnalytics();
    var d = today();
    var vid = getVisitorId();
    var sid = getSessionId();

    // Init day if needed
    if (!data.days[d]) {
      data.days[d] = { views: 0, visitors: [], sessions: [], bounce: 0, engaged: 0 };
    }
    var day = data.days[d];
    day.views++;
    if (day.visitors.indexOf(vid) === -1) day.visitors.push(vid);
    if (day.sessions.indexOf(sid) === -1) day.sessions.push(sid);

    // Device
    var device = detectDevice();
    data.devices[device] = (data.devices[device] || 0) + 1;

    // Browser
    var browser = detectBrowser();
    data.browsers[browser] = (data.browsers[browser] || 0) + 1;

    // Referrer
    var ref = getReferrerDomain();
    data.referrers[ref] = (data.referrers[ref] || 0) + 1;

    // Hour
    var h = String(hourNow());
    data.hours[h] = (data.hours[h] || 0) + 1;

    save(data);
  }

  // Track section views via IntersectionObserver
  function trackSections() {
    var data = getAnalytics();
    var sections = document.querySelectorAll('section[id]');
    var tracked = {};

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !tracked[entry.target.id]) {
          tracked[entry.target.id] = true;
          var key = '#' + entry.target.id;
          data.pages[key] = (data.pages[key] || 0) + 1;

          // Track engagement (viewed 2+ sections = engaged)
          var d = today();
          if (data.days[d] && Object.keys(tracked).length >= 2) {
            data.days[d].engaged = (data.days[d].engaged || 0) > 0 ? data.days[d].engaged : 1;
          }

          save(data);
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(function (s) { observer.observe(s); });
  }

  // Track time on page
  function trackTimeOnPage() {
    var startTime = Date.now();
    window.addEventListener('beforeunload', function () {
      var data = getAnalytics();
      var d = today();
      if (!data.days[d]) return;
      var duration = Math.round((Date.now() - startTime) / 1000);
      data.days[d].totalTime = (data.days[d].totalTime || 0) + duration;
      // Bounce = left in < 10s with only 1 section viewed
      if (duration < 10) {
        data.days[d].bounce = (data.days[d].bounce || 0) + 1;
      }
      save(data);
    });
  }

  // Don't track admin pages
  if (location.pathname.indexOf('/viak') > -1) return;

  // Init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      trackPageView();
      trackSections();
      trackTimeOnPage();
    });
  } else {
    trackPageView();
    trackSections();
    trackTimeOnPage();
  }

})();
