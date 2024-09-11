export type PageInfo = {
    pageIndex: number;
    itemsAmount: number;
};

export const mongoHelper = (pageInfo: PageInfo | undefined) => {
    if (!pageInfo) {
        return {
            pageIndex: 0,
            itemsAmount: Number.MAX_SAFE_INTEGER,
        };
    }
    let newPageInfo = {
        pageIndex: pageInfo.pageIndex ? pageInfo.pageIndex : 0,
        itemsAmount: pageInfo.itemsAmount
            ? pageInfo.itemsAmount
            : Number.MAX_SAFE_INTEGER,
    };
    return newPageInfo;
};