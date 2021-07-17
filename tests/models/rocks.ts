
interface GeoPoint {
    latitude:  number
    longitude: number 
}
  
export interface Rock {
    id:             string
    createdAt:      Date
    updatedAt?:     Date
    parentPath:     string
    name:           string
    address:        string
    prefecture:     string
    location:       GeoPoint
    seasons:        string[]
    lithology:      string
    desc:           string
    registedUserId: string
    headerUrl?:     string
    imageUrls:      string[]
}

export function dummyRock(id: string): Rock {
    return {
        id:             id,
        createdAt:      new Date(),
        updatedAt:      new Date(),
        parentPath:     '',
        name:           '日陰岩',
        address:        '東京都千代田区丸の内一丁目',
        prefecture:     '東京都',
        location:       {
            latitude:  35.681872,
            longitude: 139.765847 
        },
        seasons:        ['summer'],
        lithology:      'granite',
        desc:           'aaaaaaaaaaaaaaaaaaaa',
        registedUserId: 'other',
        headerUrl:      'https://javascript.info/url',
        imageUrls:      ['https://javascript.info/url']
    }
}