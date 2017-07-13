'use strict';

describe('pos', () => {

  it('should print text', () => {

    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

    spyOn(console, 'log');

    printReceipt(tags);

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：58.50(元)
节省：7.50(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });

  it('test function_createAllTags(tags)', () => {
    let tags=['ITEM0','ITEM0-1','ITEM0-15',"ITEM1",'ITEM2-3'];
    let result=[
        {barcode: 'ITEM0', count: 1},
        {barcode: 'ITEM0', count: 1},
        {barcode: 'ITEM0', count: 15},
        {barcode: 'ITEM1', count: 1},
        {barcode: 'ITEM2', count: 3}];
    expect(createAllTags(tags)).toEqual(result);
});

    it('test function_createAllItems(AllTags)', () => {
      let AllTags=[
          {barcode: 'ITEM000000', count: 5},
          {barcode: 'ITEM000005', count: 1},
          {barcode: 'ITEM000002', count: 3},
      ];
      let result=[
          {
              barcode: 'ITEM000000',
              name: '可口可乐',
              unit: '瓶',
              price: 3.00,
              count: 5
          },
          {
              barcode: 'ITEM000005',
              name: '方便面',
              unit: '袋',
              price: 4.50,
              count: 1
          },
          {
              barcode: 'ITEM000002',
              name: '苹果',
              unit: '斤',
              price: 5.50,
              count: 3
          },
      ];
        expect(createAllItems(AllTags)).toEqual(result);
    });

    it('test function_createNewItems(AllItems)', () => {
      let AllItems=[
          {
              barcode: 'ITEM000000',
              name: '可口可乐',
              unit: '瓶',
              price: 3.00,
              count: 5
          },
          {
              barcode: 'ITEM000002',
              name: '苹果',
              unit: '斤',
              price: 5.50,
              count: 1
          },
          {
              barcode: 'ITEM000002',
              name: '苹果',
              unit: '斤',
              price: 5.50,
              count: 3
          },
          {
              barcode: 'ITEM000000',
              name: '可口可乐',
              unit: '瓶',
              price: 3.00,
              count: 2
          },
          {
              barcode: 'ITEM000004',
              name: '电池',
              unit: '个',
              price: 2.00,
              count: 1
          },
      ];
        let result=[
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                count: 7
            },
            {
                barcode: 'ITEM000002',
                name: '苹果',
                unit: '斤',
                price: 5.50,
                count: 4
            },
            {
                barcode: 'ITEM000004',
                name: '电池',
                unit: '个',
                price: 2.00,
                count: 1
            },
        ];
        expect(createNewItems(AllItems)).toEqual(result);
    });

    it('test function_createDiscountedItems(NewItems)', () => {
      let NewItems=[
          {
              barcode: 'ITEM000000',
              name: '可口可乐',
              unit: '瓶',
              price: 3.00,
              count: 7
          },
          {
              barcode: 'ITEM000005',
              name: '方便面',
              unit: '袋',
              price: 4.50,
              count: 1
          },
      ];
        let result=[
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                count: 6
            },
            {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50,
                count: 1
            },
        ];
        expect(createDiscountedItems(NewItems)).toEqual(result);
    });

    it('test function_buildsheet(NewItems,DiscountedItems)', () => {
      let NewItems=[
          {
              barcode: 'ITEM000000',
              name: '可口可乐',
              unit: '瓶',
              price: 3.00,
              count: 7
          },
          {
              barcode: 'ITEM000005',
              name: '方便面',
              unit: '袋',
              price: 4.50,
              count: 1
          },
      ];
        let DiscountedItems=[
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                count: 6
            },
            {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50,
                count: 1
            },
        ];
        let result=[
            { barcode: 'ITEM000000', name: '可口可乐', count: 7, unit: '瓶', price: 3, subprice_now: 18 },
            { barcode: 'ITEM000005', name: '方便面', count: 1, unit: '袋', price: 4.5, subprice_now: 4.5 },
        ];
            result.total_now=22.5;
            result.save=3.00;

      expect(buildsheet(NewItems,DiscountedItems)).toEqual(result);
    });

    it('test function_calculateprice(NewItems,DiscountedItems)', () => {
        let NewItems=[
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                count: 7
            },
            {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50,
                count: 1
            },
        ];
        let DiscountedItems=[
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                count: 6
            },
            {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50,
                count: 1
            },
        ];
        let result={subprice_now:[18.00,4.5],
            total_now:22.50,
            save:3.00};
        expect(calculateprice(NewItems,DiscountedItems)).toEqual(result);
    });

    it('test function_buildperstrings(onestuffsheet)', () => {
      let onestuffsheet={ barcode: 'ITEM000000', name: '可口可乐', count: 7, unit: '瓶', price: 3, subprice_now: 18 };
      let result='名称：可口可乐，数量：7瓶，单价：3.00(元)，小计：18.00(元)';
        expect(buildperstrings(onestuffsheet)).toEqual(result);
    });

    it('test function_buildreceiptstrings(sheet)', () => {
      let sheet=[
          { barcode: 'ITEM000000', name: '可口可乐', count: 7, unit: '瓶', price: 3, subprice_now: 18 },
          { barcode: 'ITEM000005', name: '方便面', count: 1, unit: '袋', price: 4.5, subprice_now: 4.5 },
      ];
        sheet.total_now=22.5;
        sheet.save=3.00;

        let result='名称：可口可乐，数量：7瓶，单价：3.00(元)，小计：18.00(元)'+'\n'+'名称：方便面，数量：1袋，单价：4.50(元)，小计：4.50(元)';

        expect(buildreceiptstrings(sheet)).toEqual(result);
    });

       it('test function_showReceipt(sheet)', () => {
         let sheet=[
             { barcode: 'ITEM000000', name: '可口可乐', count: 7, unit: '瓶', price: 3, subprice_now: 18 },
             { barcode: 'ITEM000005', name: '方便面', count: 1, unit: '袋', price: 4.5, subprice_now: 4.5 },
         ];
           sheet.total_now=22.5;
           sheet.save=3.00;
           let result=`***<没钱赚商店>收据***
名称：可口可乐，数量：7瓶，单价：3.00(元)，小计：18.00(元)
名称：方便面，数量：1袋，单价：4.50(元)，小计：4.50(元)
----------------------
总计：22.50(元)
节省：3.00(元)
**********************`;
           expect(showReceipt(sheet)).toEqual(result);
       });
    it('test function_printReceipt(tags)', () => {
        let tags=['ITEM000000-3','ITEM000005','ITEM000000-4'];
        let result=`***<没钱赚商店>收据***
名称：可口可乐，数量：7瓶，单价：3.00(元)，小计：18.00(元)
名称：方便面，数量：1袋，单价：4.50(元)，小计：4.50(元)
----------------------
总计：22.50(元)
节省：3.00(元)
**********************`;
        spyOn(console, 'log');
        printReceipt(tags);
        expect(console.log).toHaveBeenCalledWith(result);
    });
});
