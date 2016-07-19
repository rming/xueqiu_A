var perPage = 100;
var configs = {
    domains: ["xueqiu.com"],
    scanUrls: ["http://xueqiu.com/stock/cata/stocklist.json?page=1&size=" + perPage + "&order=asc&orderby=code&type=11%2C12"],
    contentUrlRegexes: ["http://xueqiu\\.com/v4/stock/quote\\.json\\?code=\\w+"],
    helperUrlRegexes: ["http://xueqiu\\.com/stock/cata/stocklist\\.json\\?page=\\d+&size=" + perPage + "&order=asc&orderby=code&type=11%2C12"],
    enableProxy: true,
    interval: 1000
};

configs.beforeCrawl = function(site) {
    //获取 xq_a_token cookie 防止反爬
    var loginPage = "http://xueqiu.com/account/reg";
    site.requestUrl(loginPage);
};

configs.onProcessScanPage = function(page, content, site) {
    var stockData = JSON.parse(page.raw);
    // 页码计算，把所有列表页面加入待爬列表
    var total     = parseInt(stockData.count.count);
    var totalPage = Math.ceil(total/perPage);
    for (var pageNum = 1; pageNum <= totalPage; pageNum++) {
        var nextUrl = page.url.replace("?page=1", "?page=" + pageNum);
        site.addUrl(nextUrl);
    }
    return false;
};

configs.onProcessHelperPage = function(page, content, site) {
    var stockData = JSON.parse(page.raw);
    // 内容页地址格式，将所有内容页面加入到待爬列表
    var stockPage = "http://xueqiu.com/v4/stock/quote.json?code=";
    var stocks    = stockData.stocks;
    for (var i = 0, n = stocks.length; i < n; i++) {
        var nextUrl = stockPage + stocks[i].symbol;
        site.addUrl(nextUrl);
    }
    return false;
};

configs.fields = [
        {
            name: "symbol",
            selectorType: SelectorType.JsonPath,
            selector: "$..symbol"
        },
        {
            name: "exchange",
            selectorType: SelectorType.JsonPath,
            selector: "$..exchange"
        },
        {
            name: "code",
            selectorType: SelectorType.JsonPath,
            selector: "$..code"
        },
        {
            name: "name",
            selectorType: SelectorType.JsonPath,
            selector: "$..name"
        },
        {
            name: "current",
            selectorType: SelectorType.JsonPath,
            selector: "$..current"
        },
        {
            name: "percentage",
            selectorType: SelectorType.JsonPath,
            selector: "$..percentage"
        },
        {
            name: "change",
            selectorType: SelectorType.JsonPath,
            selector: "$..change"
        },
        {
            name: "open",
            selectorType: SelectorType.JsonPath,
            selector: "$..open"
        },
        {
            name: "high",
            selectorType: SelectorType.JsonPath,
            selector: "$..high"
        },
        {
            name: "low",
            selectorType: SelectorType.JsonPath,
            selector: "$..low"
        },
        {
            name: "close",
            selectorType: SelectorType.JsonPath,
            selector: "$..close"
        },
        {
            name: "last_close",
            selectorType: SelectorType.JsonPath,
            selector: "$..last_close"
        },
        {
            name: "high52w",
            selectorType: SelectorType.JsonPath,
            selector: "$..high52w"
        },
        {
            name: "low52week",
            selectorType: SelectorType.JsonPath,
            selector: "$..low52week"
        },
        {
            name: "volume",
            selectorType: SelectorType.JsonPath,
            selector: "$..volume"
        },
        {
            name: "volumeAverage",
            selectorType: SelectorType.JsonPath,
            selector: "$..volumeAverage"
        },
        {
            name: "marketCapital",
            selectorType: SelectorType.JsonPath,
            selector: "$..marketCapital"
        },
        {
            name: "eps",
            selectorType: SelectorType.JsonPath,
            selector: "$..eps"
        },
        {
            name: "pe_ttm",
            selectorType: SelectorType.JsonPath,
            selector: "$..pe_ttm"
        },
        {
            name: "pe_lyr",
            selectorType: SelectorType.JsonPath,
            selector: "$..pe_lyr"
        },
        {
            name: "beta",
            selectorType: SelectorType.JsonPath,
            selector: "$..beta"
        },
        {
            name: "totalShares",
            selectorType: SelectorType.JsonPath,
            selector: "$..totalShares"
        },
        {
            name: "time",
            selectorType: SelectorType.JsonPath,
            selector: "$..time"
        },
        {
            name: "afterHours",
            selectorType: SelectorType.JsonPath,
            selector: "$..afterHours"
        },
        {
            name: "afterHoursPct",
            selectorType: SelectorType.JsonPath,
            selector: "$..afterHoursPct"
        },
        {
            name: "afterHoursChg",
            selectorType: SelectorType.JsonPath,
            selector: "$..afterHoursChg"
        },
        {
            name: "afterHoursTime",
            selectorType: SelectorType.JsonPath,
            selector: "$..afterHoursTime"
        },
        {
            name: "updateAt",
            selectorType: SelectorType.JsonPath,
            selector: "$..updateAt"
        },
        {
            name: "dividend",
            selectorType: SelectorType.JsonPath,
            selector: "$..dividend"
        },
        {
            name: "yield",
            selectorType: SelectorType.JsonPath,
            selector: "$..yield"
        },
        {
            name: "turnover_rate",
            selectorType: SelectorType.JsonPath,
            selector: "$..turnover_rate"
        },
        {
            name: "instOwn",
            selectorType: SelectorType.JsonPath,
            selector: "$..instOwn"
        },
        {
            name: "rise_stop",
            selectorType: SelectorType.JsonPath,
            selector: "$..rise_stop"
        },
        {
            name: "fall_stop",
            selectorType: SelectorType.JsonPath,
            selector: "$..fall_stop"
        },
        {
            name: "currency_unit",
            selectorType: SelectorType.JsonPath,
            selector: "$..currency_unit"
        },
        {
            name: "amount",
            selectorType: SelectorType.JsonPath,
            selector: "$..amount"
        },
        {
            name: "net_assets",
            selectorType: SelectorType.JsonPath,
            selector: "$..net_assets"
        },
        {
            name: "hasexist",
            selectorType: SelectorType.JsonPath,
            selector: "$..hasexist"
        },
        {
            name: "has_warrant",
            selectorType: SelectorType.JsonPath,
            selector: "$..has_warrant"
        },
        {
            name: "type",
            selectorType: SelectorType.JsonPath,
            selector: "$..type"
        },
        {
            name: "flag",
            selectorType: SelectorType.JsonPath,
            selector: "$..flag"
        },
        {
            name: "rest_day",
            selectorType: SelectorType.JsonPath,
            selector: "$..rest_day"
        },
        {
            name: "amplitude",
            selectorType: SelectorType.JsonPath,
            selector: "$..amplitude"
        },
        {
            name: "lot_size",
            selectorType: SelectorType.JsonPath,
            selector: "$..lot_size"
        },
        {
            name: "min_order_quantity",
            selectorType: SelectorType.JsonPath,
            selector: "$..min_order_quantity"
        },
        {
            name: "max_order_quantity",
            selectorType: SelectorType.JsonPath,
            selector: "$..max_order_quantity"
        },
        {
            name: "tick_size",
            selectorType: SelectorType.JsonPath,
            selector: "$..tick_size"
        },
        {
            name: "kzz_stock_symbol",
            selectorType: SelectorType.JsonPath,
            selector: "$..kzz_stock_symbol"
        },
        {
            name: "kzz_stock_name",
            selectorType: SelectorType.JsonPath,
            selector: "$..kzz_stock_name"
        },
        {
            name: "kzz_stock_current",
            selectorType: SelectorType.JsonPath,
            selector: "$..kzz_stock_current"
        },
        {
            name: "kzz_convert_price",
            selectorType: SelectorType.JsonPath,
            selector: "$..kzz_convert_price"
        },
        {
            name: "kzz_covert_value",
            selectorType: SelectorType.JsonPath,
            selector: "$..kzz_covert_value"
        },
        {
            name: "kzz_cpr",
            selectorType: SelectorType.JsonPath,
            selector: "$..kzz_cpr"
        },
        {
            name: "kzz_putback_price",
            selectorType: SelectorType.JsonPath,
            selector: "$..kzz_putback_price"
        },
        {
            name: "kzz_convert_time",
            selectorType: SelectorType.JsonPath,
            selector: "$..kzz_convert_time"
        },
        {
            name: "kzz_redempt_price",
            selectorType: SelectorType.JsonPath,
            selector: "$..kzz_redempt_price"
        },
        {
            name: "kzz_straight_price",
            selectorType: SelectorType.JsonPath,
            selector: "$..kzz_straight_price"
        },
        {
            name: "kzz_stock_percent",
            selectorType: SelectorType.JsonPath,
            selector: "$..kzz_stock_percent"
        },
        {
            name: "pb",
            selectorType: SelectorType.JsonPath,
            selector: "$..pb"
        },
        {
            name: "benefit_before_tax",
            selectorType: SelectorType.JsonPath,
            selector: "$..benefit_before_tax"
        },
        {
            name: "benefit_after_tax",
            selectorType: SelectorType.JsonPath,
            selector: "$..benefit_after_tax"
        },
        {
            name: "convert_bond_ratio",
            selectorType: SelectorType.JsonPath,
            selector: "$..convert_bond_ratio"
        },
        {
            name: "totalissuescale",
            selectorType: SelectorType.JsonPath,
            selector: "$..totalissuescale"
        },
        {
            name: "outstandingamt",
            selectorType: SelectorType.JsonPath,
            selector: "$..outstandingamt"
        },
        {
            name: "maturitydate",
            selectorType: SelectorType.JsonPath,
            selector: "$..maturitydate"
        },
        {
            name: "remain_year",
            selectorType: SelectorType.JsonPath,
            selector: "$..remain_year"
        },
        {
            name: "convertrate",
            selectorType: SelectorType.JsonPath,
            selector: "$..convertrate"
        },
        {
            name: "interestrtmemo",
            selectorType: SelectorType.JsonPath,
            selector: "$..interestrtmemo"
        },
        {
            name: "release_date",
            selectorType: SelectorType.JsonPath,
            selector: "$..release_date"
        },
        {
            name: "circulation",
            selectorType: SelectorType.JsonPath,
            selector: "$..circulation"
        },
        {
            name: "par_value",
            selectorType: SelectorType.JsonPath,
            selector: "$..par_value"
        },
        {
            name: "due_time",
            selectorType: SelectorType.JsonPath,
            selector: "$..due_time"
        },
        {
            name: "value_date",
            selectorType: SelectorType.JsonPath,
            selector: "$..value_date"
        },
        {
            name: "due_date",
            selectorType: SelectorType.JsonPath,
            selector: "$..due_date"
        },
        {
            name: "publisher",
            selectorType: SelectorType.JsonPath,
            selector: "$..publisher"
        },
        {
            name: "redeem_type",
            selectorType: SelectorType.JsonPath,
            selector: "$..redeem_type"
        },
        {
            name: "issue_type",
            selectorType: SelectorType.JsonPath,
            selector: "$..issue_type"
        },
        {
            name: "bond_type",
            selectorType: SelectorType.JsonPath,
            selector: "$..bond_type"
        },
        {
            name: "warrant",
            selectorType: SelectorType.JsonPath,
            selector: "$..warrant"
        },
        {
            name: "sale_rrg",
            selectorType: SelectorType.JsonPath,
            selector: "$..sale_rrg"
        },
        {
            name: "rate",
            selectorType: SelectorType.JsonPath,
            selector: "$..rate"
        },
        {
            name: "after_hour_vol",
            selectorType: SelectorType.JsonPath,
            selector: "$..after_hour_vol"
        },
        {
            name: "float_shares",
            selectorType: SelectorType.JsonPath,
            selector: "$..float_shares"
        },
        {
            name: "float_market_capital",
            selectorType: SelectorType.JsonPath,
            selector: "$..float_market_capital"
        },
        {
            name: "disnext_pay_date",
            selectorType: SelectorType.JsonPath,
            selector: "$..disnext_pay_date"
        },
        {
            name: "convert_rate",
            selectorType: SelectorType.JsonPath,
            selector: "$..convert_rate"
        },
        {
            name: "psr",
            selectorType: SelectorType.JsonPath,
            selector: "$..psr"
        },
        {
            name: "fans",
            sourceType: SourceType.AttachedUrl,
            attachedUrl: "http://xueqiu.com/recommend/pofriends.json?type=1&start=0&count=0&code={symbol}",
            selectorType: SelectorType.JsonPath,
            selector: "$.totalcount"
        }
    ];
var crawler = new Crawler(configs);
crawler.start();

