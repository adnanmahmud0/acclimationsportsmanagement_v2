import os
import re

files = [
    "src/app/(user)/holistic-concierge/page.tsx",
    "src/app/(user)/salary-cap/page.tsx",
    "src/app/(user)/high-school-talent/page.tsx",
    "src/app/(user)/marketing-endorsements/page.tsx",
    "src/app/(user)/g-league-elite/page.tsx",
    "src/app/(user)/pre-draft/page.tsx",
    "src/app/(user)/contact/page.tsx",
    "src/app/(user)/wnba/page.tsx",
    "src/app/(user)/two-way-contracts/page.tsx"
]

def update_file(path):
    if not os.path.exists(path):
        print(f"File not found: {path}")
        return
    
    with open(path, 'r') as f:
        content = f.read()
    
    # 1. Update import
    content = content.replace('import { buildPageMetadata } from "@/lib/seo";', 'import { buildMetadataFromPage } from "@/lib/seo";')
    
    # 2. Update generateMetadata
    # Matches export async function generateMetadata() { ... }
    pattern = r'export async function generateMetadata\(\) \{[\s\S]*?return buildPageMetadata\("(.*?)"\);\s*\}'
    
    match = re.search(pattern, content)
    if match:
        route = match.group(1)
        replacement = f'''export async function generateMetadata() {{
  const page = await getPageData();
  return buildMetadataFromPage(page, "{route}");
}}'''
        content = re.sub(pattern, replacement, content)
        
    with open(path, 'w') as f:
        f.write(content)
    print(f"Updated: {path}")

for f in files:
    update_file(f)
