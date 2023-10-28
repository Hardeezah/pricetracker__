"use server"
import {scrapeAmazonProduct} from '../scrapper/index'

export async function scrapeAndStoreProduct(productUrl: string){
    if(!productUrl) return;

    try{
        const scrappedProduct = await scrapeAmazonProduct(productUrl);
        
    }catch(error: any){
    throw new Error(`Failed to create/update product: ${error.message}`)
    }
}