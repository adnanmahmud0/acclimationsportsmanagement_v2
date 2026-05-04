import os

files = [
    "src/components/contract-negotiation-editor.tsx",
    "src/components/generic-page-editor.tsx",
    "src/components/holistic-concierge-editor.tsx",
    "src/components/home-page-editor.tsx",
    "src/components/marketing-endorsements-editor.tsx",
    "src/components/personal-branding-editor.tsx",
    "src/components/pre-draft-editor.tsx",
    "src/components/salary-cap-editor.tsx"
]

for file_path in files:
    if os.path.exists(file_path):
        with open(file_path, 'r') as f:
            content = f.read()
        
        # Replace the type definition
        old_str = 'const updateSeo = (field: keyof PageData["seo"], value: string | FAQ[]) => {'
        new_str = 'const updateSeo = (field: keyof PageData["seo"], value: any) => {'
        
        # Using 'any' is easier to handle the mixed types (string, boolean, FAQ[]) 
        # but 'string | FAQ[] | boolean' is more precise.
        # Let's use the precise one.
        new_str_precise = 'const updateSeo = (field: keyof PageData["seo"], value: string | FAQ[] | boolean) => {'
        
        content = content.replace(old_str, new_str_precise)
        
        with open(file_path, 'w') as f:
            f.write(content)
        print(f"Updated {file_path}")
