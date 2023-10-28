import axios from "axios";
import * as cheerio from 'cheerio'
import { extractPrice } from "../utils";

export async function scrapeAmazonProduct(url:string){
    if(!url) return;

    

    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port =22225;
    const session_id =(1000000 * Math.random()) |0;

    const options={
        auth:{
            username: `${username}-session-${session_id}`,
            password,
        },
        host:'brd.superproxy.io',
        port,
        rejectUnauthorized: false,

    }

    try{
        const response = await axios.get(url, options);
        const $ = cheerio.load(response.data);

        const title =$('#productTitle').text().trim();
        const currentPrice = extractPrice(
            $('.priceToPay span.a-price-whole'),
            $('a.size.base.a-color-price'),
            $('.a-button-selected .a-color-base'),
            $('.a-price.a-text-price')
        );
        const originalPrice = extractPrice(
            $('#priceblock_ourprice'),
            $('a-price.a-text-price span.a-offscreen')
        );
        console.log(title, currentPrice)
        console.log(response.data);

    }catch(error:any){
        throw new Error(`Failed to srape product: ${error.message}`)
    }
}