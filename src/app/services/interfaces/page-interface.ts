export class Page {
  id: number = 0
  uri: string = ""
  ru: string = ""
  us: string = ""
  lv: string = ""

  static toObject( page: Page ): object {
    return {
      id: page.id,
      uri: page.uri,
      "ru-RU": page.ru,
      "en-US": page.us,
      "lv-LV": page.lv
    }
  }

  static fromObject( obj: object ): Page {
    let page: Page = new Page
    page.id = obj[ "id" ]
    page.uri = obj[ "uri" ]
    page.ru = obj[ "ru-RU" ]
    page.us = obj[ "en-US" ]
    page.lv = obj[ "lv-LV" ]
    return page
  }
}
