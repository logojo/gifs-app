import { Gif } from '../interfaces/gifs.interface';
import { GiphyItem } from '../interfaces/giphy.interface';

export class GifMapper {

    static mapGiphyItemToGif( gifItem : GiphyItem ) : Gif {
        return {
            id: gifItem.id,
            title: gifItem.title,
            url: gifItem.images.original.url
        }
    }

    static mapGiphyItemsToGifArray( items: GiphyItem[] ): Gif[] {
        return items.map( this.mapGiphyItemToGif );
    }
}