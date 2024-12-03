const BASE_TAG = document.querySelector("base[href]")

const CANONICAL_AUTO_LINK = document.querySelector('link[rel="canonical"]')
  ? document.querySelector('link[rel="canonical"]')
  : document.createElement("link")
CANONICAL_AUTO_LINK.setAttribute("rel", "canonical")
CANONICAL_AUTO_LINK.setAttribute("href", location.origin)
BASE_TAG.after(CANONICAL_AUTO_LINK);

(function () {
  [
    "www.google.com",
    "www.bing.com",
    "www.gstatic.com",
    "fonts.googleapis.com",
    "cdn.jsdelivr.net",
    "www.jsdelivr.com",
    "gmpg.org",
  ].forEach((link) => {
    const DNS_PREFETCH_AUTO_LINK = document.createElement("link")
    DNS_PREFETCH_AUTO_LINK.setAttribute("rel", "dns-prefetch")
    DNS_PREFETCH_AUTO_LINK.setAttribute("href", `https://${link}`)
    BASE_TAG.after(DNS_PREFETCH_AUTO_LINK)
  })
})()
