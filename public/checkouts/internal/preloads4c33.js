
    (function() {
      var preconnectOrigins = ["https://cdn.shopify.com"];
      var scripts = ["/cdn/shopifycloud/checkout-web/assets/c1/polyfills-legacy.DKtvhZTa.js","/cdn/shopifycloud/checkout-web/assets/c1/app-legacy.-VbUJtMG.js","/cdn/shopifycloud/checkout-web/assets/c1/630ba094-legacy.Gy6JyFPQ.js","/cdn/shopifycloud/checkout-web/assets/c1/4509beb0-legacy.ZE-CXg_R.js","/cdn/shopifycloud/checkout-web/assets/c1/6a2fc6d6-legacy.BAS-ZjBe.js","/cdn/shopifycloud/checkout-web/assets/c1/f025431a-legacy.CuSCqDke.js","/cdn/shopifycloud/checkout-web/assets/c1/6ec9a0fa-legacy.BS3Ce5jm.js","/cdn/shopifycloud/checkout-web/assets/c1/164ad2e3-legacy.BToB20tZ.js","/cdn/shopifycloud/checkout-web/assets/c1/f4abf1ad-legacy.k6cwz7rU.js","/cdn/shopifycloud/checkout-web/assets/c1/7d6bf786-legacy.BU9cd2rA.js","/cdn/shopifycloud/checkout-web/assets/c1/6b0dea54-legacy.Cpo7nhiP.js","/cdn/shopifycloud/checkout-web/assets/c1/0f5b1987-legacy.BEjpqNo7.js","/cdn/shopifycloud/checkout-web/assets/c1/9e5d8eb8-legacy.CpBXmpw2.js","/cdn/shopifycloud/checkout-web/assets/c1/a45fed45-legacy.3yqGlI83.js","/cdn/shopifycloud/checkout-web/assets/c1/c328865d-legacy.DEql6wIC.js","/cdn/shopifycloud/checkout-web/assets/c1/f1384cc2-legacy._MEX-4t1.js","/cdn/shopifycloud/checkout-web/assets/c1/4618373b-legacy.CpDGnSf9.js","/cdn/shopifycloud/checkout-web/assets/c1/486c3fda-legacy.CGdFUVOg.js","/cdn/shopifycloud/checkout-web/assets/c1/17f6d6d8-legacy.BqETMBMf.js","/cdn/shopifycloud/checkout-web/assets/c1/19286c78-legacy.D-yi3eFP.js","/cdn/shopifycloud/checkout-web/assets/c1/cb6adac5-legacy.BZ7T4o6R.js","/cdn/shopifycloud/checkout-web/assets/c1/c7b92b97-legacy.CHsdHoJe.js","/cdn/shopifycloud/checkout-web/assets/c1/faece749-legacy.BSVgoXho.js","/cdn/shopifycloud/checkout-web/assets/c1/77d9e668-legacy.DxjaWuog.js","/cdn/shopifycloud/checkout-web/assets/c1/83dfec2b-legacy.C58Q8M3f.js","/cdn/shopifycloud/checkout-web/assets/c1/a1157422-legacy.7eVaOBVs.js","/cdn/shopifycloud/checkout-web/assets/c1/77821758-legacy.CyJFt8Xa.js","/cdn/shopifycloud/checkout-web/assets/c1/9c33421f-legacy.RbmN2PB3.js","/cdn/shopifycloud/checkout-web/assets/c1/2c7267bc-legacy.B-mkzOSS.js","/cdn/shopifycloud/checkout-web/assets/c1/37c3ef79-legacy.CSanhAzF.js","/cdn/shopifycloud/checkout-web/assets/c1/82d59f8f-legacy.DOlnaZbw.js","/cdn/shopifycloud/checkout-web/assets/c1/651bb548-legacy.CdL-OtbY.js","/cdn/shopifycloud/checkout-web/assets/c1/b71b03d1-legacy.C9OGZRm8.js","/cdn/shopifycloud/checkout-web/assets/c1/928dbd30-legacy.BMuumXZR.js","/cdn/shopifycloud/checkout-web/assets/c1/a8202753-legacy.CeRn4_Nw.js","/cdn/shopifycloud/checkout-web/assets/c1/2f5db8a5-legacy.D8SkiVJ5.js","/cdn/shopifycloud/checkout-web/assets/c1/c0466e46-legacy.BsSRb_fd.js","/cdn/shopifycloud/checkout-web/assets/c1/5f07060a-legacy.BGuWf4E2.js","/cdn/shopifycloud/checkout-web/assets/c1/83f74304-legacy.BFgkrxSu.js","/cdn/shopifycloud/checkout-web/assets/c1/7edfee1d-legacy.BhCtazTl.js","/cdn/shopifycloud/checkout-web/assets/c1/ce604576-legacy.Df9Y92uL.js","/cdn/shopifycloud/checkout-web/assets/c1/b01c110b-legacy.Cn4JRGvT.js","/cdn/shopifycloud/checkout-web/assets/c1/f1754c88-legacy.CrHEUX54.js","/cdn/shopifycloud/checkout-web/assets/c1/5d731017-legacy.7_yRM3im.js","/cdn/shopifycloud/checkout-web/assets/c1/f00fed33-legacy.BYPFuQxE.js","/cdn/shopifycloud/checkout-web/assets/c1/94493b3a-legacy.C6RLK5wa.js","/cdn/shopifycloud/checkout-web/assets/c1/cc41c36d-legacy.DPtTLOta.js","/cdn/shopifycloud/checkout-web/assets/c1/99cd9b25-legacy.BcSC9KBe.js","/cdn/shopifycloud/checkout-web/assets/c1/676eb8e9-legacy.C7dULEys.js","/cdn/shopifycloud/checkout-web/assets/c1/6a8181a5-legacy.D8CwbZnr.js","/cdn/shopifycloud/checkout-web/assets/c1/0e3247a0-legacy.6Ve_CweV.js","/cdn/shopifycloud/checkout-web/assets/c1/1dbf806c-legacy.ChkCtRom.js","/cdn/shopifycloud/checkout-web/assets/c1/a56386a6-legacy.P6cEz1M9.js","/cdn/shopifycloud/checkout-web/assets/c1/e1177f6f-legacy.CNCkffdl.js","/cdn/shopifycloud/checkout-web/assets/c1/674595ba-legacy.tmK9VtBo.js","/cdn/shopifycloud/checkout-web/assets/c1/0d85278a-legacy.Cyk-Z1Fl.js","/cdn/shopifycloud/checkout-web/assets/c1/173d1fdf-legacy.BMurOEQ2.js","/cdn/shopifycloud/checkout-web/assets/c1/16138b9e-legacy.vD3scW2b.js","/cdn/shopifycloud/checkout-web/assets/c1/55432860-legacy.Di_X4CQY.js","/cdn/shopifycloud/checkout-web/assets/c1/0be192b6-legacy.FaDVXHxQ.js","/cdn/shopifycloud/checkout-web/assets/c1/2bce9289-legacy.DIy4B_nw.js","/cdn/shopifycloud/checkout-web/assets/c1/62a11d3e-legacy.C-wrp1J_.js","/cdn/shopifycloud/checkout-web/assets/c1/9a493f3d-legacy.AOPBi_U0.js","/cdn/shopifycloud/checkout-web/assets/c1/402b40d8-legacy.GyINAAcD.js","/cdn/shopifycloud/checkout-web/assets/c1/dfb65aab-legacy.CH7J0-31.js","/cdn/shopifycloud/checkout-web/assets/c1/17db3e71-legacy.DYp10sCC.js","/cdn/shopifycloud/checkout-web/assets/c1/ee4d5c67-legacy.BMfLlm0k.js","/cdn/shopifycloud/checkout-web/assets/c1/f3089cd3-legacy.DV5505j5.js","/cdn/shopifycloud/checkout-web/assets/c1/53e8828a-legacy.BBmeQuIu.js","/cdn/shopifycloud/checkout-web/assets/c1/4c5b1c9e-legacy.VyK6dt4W.js","/cdn/shopifycloud/checkout-web/assets/c1/a541bc81-legacy.B7MBQZDl.js","/cdn/shopifycloud/checkout-web/assets/c1/b4f06cd6-legacy.DNXiRqT_.js","/cdn/shopifycloud/checkout-web/assets/c1/2b0d1656-legacy.D70_pg-_.js","/cdn/shopifycloud/checkout-web/assets/c1/64c3067d-legacy.DUilPJ_V.js","/cdn/shopifycloud/checkout-web/assets/c1/7bd337ea-legacy.B4XHRXu0.js","/cdn/shopifycloud/checkout-web/assets/c1/bbe16958-legacy.BrZa5cDH.js","/cdn/shopifycloud/checkout-web/assets/c1/4205169c-legacy.BzJKFuMm.js","/cdn/shopifycloud/checkout-web/assets/c1/35185bee-legacy.CX4kueiE.js","/cdn/shopifycloud/checkout-web/assets/c1/542b75cf-legacy.hQgw5_c2.js","/cdn/shopifycloud/checkout-web/assets/c1/74e5a557-legacy.DJa1IBa7.js","/cdn/shopifycloud/checkout-web/assets/c1/f4d0afee-legacy.hiWY5dnT.js","/cdn/shopifycloud/checkout-web/assets/c1/0b704646-legacy.Cexb9lcL.js","/cdn/shopifycloud/checkout-web/assets/c1/a7ef2c81-legacy.Ds4xtRWG.js","/cdn/shopifycloud/checkout-web/assets/c1/70565d02-legacy.DgdY4xKQ.js","/cdn/shopifycloud/checkout-web/assets/c1/a222330e-legacy.BVTYoHqY.js","/cdn/shopifycloud/checkout-web/assets/c1/8d7e1337-legacy.Db-m8UkO.js","/cdn/shopifycloud/checkout-web/assets/c1/5bf177e7-legacy.CFXvf7yz.js","/cdn/shopifycloud/checkout-web/assets/c1/f0b3b291-legacy.BAruGv2u.js","/cdn/shopifycloud/checkout-web/assets/c1/114cc9d1-legacy.7y_RUBa9.js","/cdn/shopifycloud/checkout-web/assets/c1/e7ae9e74-legacy.CnZ1LEe4.js","/cdn/shopifycloud/checkout-web/assets/c1/91e796b6-legacy.Cf6HE6yz.js","/cdn/shopifycloud/checkout-web/assets/c1/c380a132-legacy.CJgUkAmX.js","/cdn/shopifycloud/checkout-web/assets/c1/3839d836-legacy.BrneKybP.js","/cdn/shopifycloud/checkout-web/assets/c1/72fde58e-legacy.DadqzLiF.js","/cdn/shopifycloud/checkout-web/assets/c1/8cad6ded-legacy.IusaTiOs.js","/cdn/shopifycloud/checkout-web/assets/c1/9e556116-legacy.B9lKFZJG.js","/cdn/shopifycloud/checkout-web/assets/c1/abf134e3-legacy.Bw7iy29r.js","/cdn/shopifycloud/checkout-web/assets/c1/8e6bd8e5-legacy.CTcHa-O1.js","/cdn/shopifycloud/checkout-web/assets/c1/e6a05f36-legacy.BYy1hI4S.js","/cdn/shopifycloud/checkout-web/assets/c1/71b36506-legacy.DtJattMX.js","/cdn/shopifycloud/checkout-web/assets/c1/a012ee00-legacy.D60IwwSh.js","/cdn/shopifycloud/checkout-web/assets/c1/7aefefff-legacy.zikYQzFb.js","/cdn/shopifycloud/checkout-web/assets/c1/ea392d18-legacy.ilnS00M1.js","/cdn/shopifycloud/checkout-web/assets/c1/b2ef26e8-legacy.5P0MItGF.js","/cdn/shopifycloud/checkout-web/assets/c1/99bfe9cf-legacy.CpKXPqX3.js","/cdn/shopifycloud/checkout-web/assets/c1/b290e37f-legacy.DWhwqMRC.js","/cdn/shopifycloud/checkout-web/assets/c1/3c46c6f5-legacy.DU5moy6X.js","/cdn/shopifycloud/checkout-web/assets/c1/9961965b-legacy.CPgIVX74.js","/cdn/shopifycloud/checkout-web/assets/c1/e29daa9a-legacy.Dw1QQ4Gj.js","/cdn/shopifycloud/checkout-web/assets/c1/b2371320-legacy.4vggxhVr.js","/cdn/shopifycloud/checkout-web/assets/c1/a735741f-legacy.DKeGwD0O.js","/cdn/shopifycloud/checkout-web/assets/c1/8efef14b-legacy.DyAcOafz.js","/cdn/shopifycloud/checkout-web/assets/c1/5a1effbb-legacy.DmJVGJb3.js","/cdn/shopifycloud/checkout-web/assets/c1/67e8c664-legacy.BOELdnOB.js","/cdn/shopifycloud/checkout-web/assets/c1/045c921f-legacy.WrKMMDkk.js","/cdn/shopifycloud/checkout-web/assets/c1/bdb60128-legacy.r5jVopR8.js","/cdn/shopifycloud/checkout-web/assets/c1/a0df1226-legacy.ISnPsEl6.js","/cdn/shopifycloud/checkout-web/assets/c1/5d5cabdf-legacy.brI4tp2x.js","/cdn/shopifycloud/checkout-web/assets/c1/c1adaf81-legacy.DEkqN6v2.js","/cdn/shopifycloud/checkout-web/assets/c1/21162507-legacy.CokU_qaN.js","/cdn/shopifycloud/checkout-web/assets/c1/5f1fce8b-legacy.n6ftDVDO.js","/cdn/shopifycloud/checkout-web/assets/c1/139f607b-legacy.e5_O8SB4.js","/cdn/shopifycloud/checkout-web/assets/c1/bace9a08-legacy.BkkhzMUX.js","/cdn/shopifycloud/checkout-web/assets/c1/8e2be3f2-legacy.BHBciZnz.js","/cdn/shopifycloud/checkout-web/assets/c1/2d034bf2-legacy.DCR35tvO.js","/cdn/shopifycloud/checkout-web/assets/c1/972590c9-legacy.DQX6Jka9.js","/cdn/shopifycloud/checkout-web/assets/c1/bc751930-legacy.0iZWJLyL.js","/cdn/shopifycloud/checkout-web/assets/c1/842452fd-legacy.ShiKwAiI.js","/cdn/shopifycloud/checkout-web/assets/c1/a70a5b74-legacy.BvVFKbaQ.js","/cdn/shopifycloud/checkout-web/assets/c1/2692118b-legacy.BARpPMWG.js","/cdn/shopifycloud/checkout-web/assets/c1/c4303b96-legacy.jGDjUXnf.js","/cdn/shopifycloud/checkout-web/assets/c1/7ee3a05c-legacy.HrpToDKi.js","/cdn/shopifycloud/checkout-web/assets/c1/0d8691fc-legacy.FdWpL68c.js","/cdn/shopifycloud/checkout-web/assets/c1/b0923a20-legacy.CRU-r2w0.js","/cdn/shopifycloud/checkout-web/assets/c1/7e9c6d7c-legacy.-TVOmEIA.js","/cdn/shopifycloud/checkout-web/assets/c1/4bb32466-legacy.D-tTeLHY.js","/cdn/shopifycloud/checkout-web/assets/c1/ed37d3c3-legacy.DizroMTY.js","/cdn/shopifycloud/checkout-web/assets/c1/30df5a02-legacy.D1cY8lrm.js","/cdn/shopifycloud/checkout-web/assets/c1/e32a8416-legacy.CbEHlI2a.js","/cdn/shopifycloud/checkout-web/assets/c1/eb0f242a-legacy.2uGMxEQD.js","/cdn/shopifycloud/checkout-web/assets/c1/109c16d9-legacy.Dm314m87.js","/cdn/shopifycloud/checkout-web/assets/c1/69f8f26d-legacy.CDuqe-xc.js","/cdn/shopifycloud/checkout-web/assets/c1/121bd940-legacy.8MqTzX8q.js","/cdn/shopifycloud/checkout-web/assets/c1/e72406f8-legacy.CWzUG6hB.js"];
      var styles = [];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = [];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = preconnectOrigins.concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        function run() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        }
        var next = (self.requestIdleCallback || setTimeout).bind(self, run);
        next();
      }

      function onLoaded() {
        try {
          if (parseFloat(navigator.connection.effectiveType) > 2 && !navigator.connection.saveData) {
            preconnectAssets();
            prefetchAssets();
          }
        } catch (e) {}
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  