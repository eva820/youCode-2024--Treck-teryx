import requests

# Function to fetch posts
def fetch_posts():
    # Replace YOUR_API_URL with the actual URL of the API
    response = requests.get('https://core.dxpapi.com/api/v1/core/?account_id=7358&domain_key=arcteryx&fl=analytics_name%2Ccollection%2Ccolour_images_map%2Ccolour_images_map_ca%2Cdescription%2Cdiscount_price_ca%2Cgender%2Chover_image%2Cis_new%2Cis_pro%2Cis_revised%2Cprice_ca%2Cpid%2Creview_count%2Crating%2Cslug%2Ctitle%2Cthumb_image&efq=genders%3A%28%22men%22%29&_br_uid_2=uid%3D8986126272758%3Av%3D15.0%3Ats%3D1709256759599%3Ahc%3D469&ref_url=https%3A%2F%2Farcteryx.com%2Fca%2Fen&url=https%3A%2F%2Farcteryx.com%2Fca%2Fen%2Fc%2Fmens%2Fshell-jackets&request_id=5483043020827&rows=200&start=0&view_id=ca&request_type=search&search_type=category&q=shell-jackets-men')
    if response.status_code == 200:
        data = response.json()
        # Correctly navigating to the 'docs' based on the provided JSON structure
        posts = data['response']['docs']
        return posts
    else:
        print("Failed to fetch posts")
        return []

# Function to search for products by gender, color, and product type in title or description
def search_products(products, gender, color, product_type):
    matching_products = []
    for product in products:
        # Check if gender matches
        if product['gender'].lower() != gender.lower():
            continue
        
        # Check if color is present in 'colour_images_map_ca'
        color_present = any(color.lower() in color_info.split(":::")[0].lower() for color_info in product['colour_images_map_ca'])
        if not color_present:
            continue
        
        # Check if product type is mentioned in title or description
        if product_type.lower() not in product['title'].lower() and product_type.lower() not in product['description'].lower():
            continue
        
        matching_products.append(product)
    
    return matching_products

# Main function
def main():
    gender = input("Enter gender (men or women): ")
    color = input("Enter color: ")
    product_type = input("Enter product type (e.g., shoes, jacket): ")
    
    products = fetch_posts()
    matching_products = search_products(products, gender, color, product_type)
    
    if matching_products:
        print(f"Found {len(matching_products)} products matching criteria:")
        for product in matching_products:
            print(f"- {product['title']}")
    else:
        print("No products found matching criteria.")

if __name__ == "__main__":
    main()
