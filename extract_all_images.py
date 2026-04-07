import json, re, os

def extract_product_images(filepath):
    data = json.load(open(filepath))
    html = data['data']['html']
    patterns = [
        r'(?:src|data-src|data-bg|data-image)=["\x27]([^"\x27>]*?\.(?:jpg|jpeg|png|webp|gif|avif)(?:\?[^"\x27>]*)?)["\x27]',
        r'url\(["\x27]?([^"\x27>]*?\.(?:jpg|jpeg|png|webp|gif|avif)(?:\?[^"\x27>]*)?)["\x27]?\)',
        r'(https?://[^\s"\x27<>\\&;]*?(?:/products/|/files/)[^\s"\x27<>\\&;]*?\.(?:jpg|jpeg|png|webp|gif|avif)(?:\?[^\s"\x27<>\\&;]*)?)',
        r'(//securfix\.pt[^\s"\x27<>\\&;]*?(?:/products/|/files/)[^\s"\x27<>\\&;]*?\.(?:jpg|jpeg|png|webp|gif|avif)(?:\?[^\s"\x27<>\\&;]*)?)',
    ]
    seen = set()
    results = []
    for p in patterns:
        for m in re.finditer(p, html, re.IGNORECASE):
            url = m.group(1)
            url = url.replace('&amp;', '&')
            for ch in [')', '"', "'", '>']:
                if url.endswith(ch):
                    url = url[:-1]
            if ('/products/' in url or '/files/' in url) and url not in seen:
                seen.add(url)
                results.append(url)
    return results

all_collections = {
    'panels': '/home/z/my-project/panels-images.json',
    'chainlink': '/home/z/my-project/chainlink-images.json',
    'firedoors': '/home/z/my-project/firedoors-images.json',
    'securitydoors': '/home/z/my-project/securitydoors-images.json',
    'meshgates': '/home/z/my-project/meshgates-images.json',
    'utilitydoors': '/home/z/my-project/utilitydoors-images.json',
    'slidingdoors': '/home/z/my-project/slidingdoors-images.json',
    'tramex': '/home/z/my-project/tramex-images.json',
    'accessories': '/home/z/my-project/accessories-images.json',
    'fencing': '/home/z/my-project/fencing-images.json',
    'doors': '/home/z/my-project/doors-images.json',
    'home': '/home/z/my-project/home-images.json',
}

all_product_urls = {}

for name, filepath in all_collections.items():
    if not os.path.exists(filepath):
        print(f"  SKIP {filepath}")
        continue
    urls = extract_product_images(filepath)
    for url in urls:
        match = re.search(r'/products/([^/?]+)', url)
        if not match:
            continue
        handle = match.group(1).split('_300x')[0].split('_450x')[0].split('_{width}x')[0]
        if handle not in all_product_urls:
            all_product_urls[handle] = url
        else:
            existing = all_product_urls[handle]
            if '_300x' in existing and ('_450x' in url or '_540x' in url):
                all_product_urls[handle] = url
            elif '{width}' in existing and '{width}' not in url:
                all_product_urls[handle] = url

print(f"Total unique product handles found: {len(all_product_urls)}")
for handle, url in sorted(all_product_urls.items()):
    if url.startswith('//'):
        url = 'https:' + url
    print(f"  {handle}")
    print(f"    -> {url}")
