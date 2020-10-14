console.log("Radixsort!\n");


const getMax = (arr) => {
    let max = arr[0];
    for (let i = 1; i < arr.length - 1; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

const countSort = (arr, exp) => {
    let output = []; // output array
    let i, count = [];
    for (let j = 0; j < 10; j++) {
        count[j] = 0;
    }
 
    // Store count of occurrences in count[]
    for (i = 0; i < arr.length; i++)
        count[Math.floor(arr[i] / exp) % 10]++;
    

    // Change count[i] so that count[i] now contains actual
    //  position of this digit in output[]
    for (i = 1; i < 10; i++)
        count[i] += count[i - 1];

        
 
    // Build the output array
    for (i = arr.length - 1; i >= 0; i--) {
        output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
        count[Math.floor(arr[i] / exp) % 10]--;
    }
 
    // Copy the output array to arr[], so that arr[] now
    // contains sorted numbers according to current digit
    for (i = 0; i < arr.length; i++)
        arr[i] = output[i];
}

const radixsort = (arr) => {
    let m = getMax(arr);

    for (let exp = 1; m / exp > 1; exp *= 10) {
        countSort(arr, exp);
    }
}

const main = () => {
    // cons,t arr = [802, 2, 24, 45, 66, 170, 75, 90];
    const arr = [338,
        19,
        60,
       414,
       132,
        37,
       357,
        40,
       237,
       312,
       167,
       823,
       333,
       928,
       733,
       334,
       901,
       651,
       392,
       456,
        35,
       939,
       907,
       273,
       573,
       796,
       688,
       757,
       758,
       792,
       697,
       938,
       623,
       842,
       420,
       315,
       980,
       453,
       226,
       115,
       504,
       340,
       169,
       790,
       205,
       387,
       885,
       486,
       346,
       336,
       560,
       505,
       888,
       249,
       211,
       756,
       734,
       992,
       853,
       180,
         6,
        65,
       534,
        28,
       197,
       955,
       455,
       632,
       352,
       767,
       157,
       459,
        82,
       158,
        99,
       300,
       819,
       774,
        34,
       548,
       883,
       255,
       886,
        29,
       234,
       763,
       862,
       322,
       498,
       528,
       100,
       638,
       412,
       720,
       397,
        50,
       358,
       377,
       806,
       810,
       785,
        96,
       293,
       438,
       499,
       235,
       503,
       702,
        22,
       689,
       247,
       492,
       373,
       828,
       589,
       276,
       599,
       592,
       525,
       603,
       509,
       879,
       859,
       969,
        25,
       779,
       305,
       394,
        23,
       476,
       710,
       537,
       578,
       518,
       108,
       335,
       694,
       354,
       641,
        21,
       195,
       735,
       477,
       321,
       337,
       684,
       716,
       605,
       890,
       191,
       203,
       353,
       241,
       404,
       899,
       323,
       435,
       709,
       433,
       707,
       130,
        26,
        61,
       101,
       661,
       206,
       248,
       201,
       940,
       202,
       388,
       120,
       457,
       187,
       737,
       786,
       609,
       818,
       762,
       801,
       549,
       212,
       452,
       495,
       849,
       604,
       165,
       490,
       556,
       987,
       654,
       246,
        51,
       650,
       561,
        86,
       475,
        64,
       413,
       432,
       622,
       910,
       829,
       811,
       272,
       896,
       210,
       739,
       448,
       147,
       729,
       527,
       170,
       991,
       836,
       109,
       644,
       405,
       513,
       310,
        75,
       867,
        85,
        11,
       621,
       267,
       295,
        20,
       415,
        76,
       134,
       428,
       742,
       751,
       114,
        93,
       680,
       782,
       930,
       341,
       329,
       419,
       793,
       576,
        15,
       608,
       918,
       895,
       773,
       713,
       878,
       467,
       794,
       137,
        92,
       128,
       426,
       723,
        36,
       825,
       275,
       230,
       493,
       324,
       761,
       994,
       846,
       839,
       146,
       898,
       870,
       262,
       348,
       601,
       687,
        16,
       769,
       743,
       474,
       844,
        77,
       316,
       422,
       942,
       590,
       159,
        83,
       250,
       959,
       692,
       258,
       530,
       971,
       302,
       384,
       993,
       540,
        70,
       963,
       629,
       521,
       616,
       277,
        59,
       133,
       755,
       611,
       673,
       121,
       410,
       585,
       149,
       678,
       696,
       421,
       102,
       378,
       424,
       691,
        45,
        32,
       106,
         8,
       817,
       747,
       840,
       564,
       516,
       679,
       347,
       568,
        42,
       311,
       726,
       519,
       269,
        41,
       156,
       116,
       545,
       396,
       571,
       582,
       851,
       962,
       327,
       617,
       429,
       136,
       681,
       636,
       263,
        84,
       393,
       721,
       319,
        55,
       968,
       557,
       232,
       719,
       871,
        39,
       731,
       588,
       470,
       598,
       162,
       626,
        78,
        90,
       186,
       472,
       520,
       196,
       270,
       555,
       875,
       374,
       920,
       950,
       409,
       188,
       127,
        43,
        44,
       148,
       522,
       749,
       539,
       402,
       480,
       655,
       948,
       631,
       430,
       172,
       966,
       831,
       982,
       507,
       266,
       924,
       615,
       826,
       345,
       936,
       970,
       983,
       274,
       746,
       478,
       989,
       921,
       712,
       271,
       727,
       554,
       941,
       643,
       339,
       558,
       822,
       876,
       213,
       915,
       481,
       854,
       260,
       301,
       176,
       693,
       759,
       975,
       437,
       164,
       288,
       253,
       612,
       292,
        38,
       449,
       326,
       833,
       508,
       613,
       122,
       732,
       913,
       142,
       666,
       500,
       181,
       444,
       695,
       408,
       313,
       371,
       908,
       282,
       593,
       126,
       359,
       289,
       510,
       183,
       185,
       553,
       988,
       865,
       760,
       652,
       580,
       934,
       485,
       835,
       153,
       451,
       283,
       376,
       639,
       261,
       240,
        66,
       446,
       628,
       708,
        33,
       278,
       837,
       117,
        56,
       824,
       217,
       686,
       911,
       464,
       984,
       986,
       487,
       781,
       526,
       891,
       778,
       306,
       572,
       436,
       546,
       579,
       355,
       699,
        63,
       660,
       155,
       602,
       484,
       469,
       182,
       111,
        27,
       268,
       799,
        91,
       777,
       858,
        62,
        69,
       642,
        87,
       916,
       342,
         1,
       771,
       869,
       501,
       297,
       401,
       722,
       418,
       714,
       873,
       946,
       207,
        68,
       887,
       318,
       349,
       906,
       236,
       610,
      1000,
       795,
       892,
       190,
       482,
       242,
       738,
        81,
       506,
       668,
       830,
       964,
       600,
       256,
       804,
       434,
       706,
       416,
       166,
       791,
       231,
       789,
       977,
       958,
       163,
       228,
       559,
       290,
       514,
       365,
       997,
       952,
       344,
       669,
       386,
       547,
       330,
       815,
       877,
       286,
       919,
       931,
       594,
       447,
       981,
       724,
       458,
        17,
       768,
       439,
       161,
       364,
       168,
       574,
       406,
       238,
       929,
       645,
       532,
       443,
       112,
       730,
       972,
       703,
       953,
        13,
       637,
       903,
       552,
       659,
       857,
        52,
       215,
       224,
       151,
         2,
       222,
       662,
       765,
       245,
       745,
       372,
       400,
       200,
       171,
       700,
         5,
       551,
       736,
       110,
       533,
       802,
       395,
       625,
       664,
       914,
       670,
       284,
        67,
       192,
       912,
       303,
       596,
       753,
       119,
       820,
       798,
       363,
        71,
       814,
       105,
       463,
       208,
       399,
       331,
       904,
       562,
       843,
       233,
       583,
       766,
       139,
       442,
       685,
        18,
       154,
       239,
       417,
       935,
       715,
        88,
       199,
       296,
       550,
       251,
       152,
       524,
       382,
       189,
        79,
       595,
       905,
       356,
       620,
       917,
       618,
       489,
       677,
       468,
        97,
       279,
       954,
       483,
       821,
       998,
       635,
       884,
       254,
       827,
       407,
       682,
        14,
       909,
       577,
       587,
        46,
       960,
       175,
       728,
       748,
       788,
       872,
       140,
       741,
       922,
       325,
       701,
       750,
        30,
       566,
       874,
       361,
       229,
       214,
       380,
       627,
       538,
       633,
       776,
       956,
       944,
       597,
       390,
       135,
        49,
       131,
       927,
       209,
       431,
       947,
       770,
       606,
       848,
       889,
       897,
         3,
       845,
       656,
       752,
       370,
       291,
       542,
       441,
       118,
       423,
       543,
       317,
       529,
       570,
       179,
       812,
       704,
       385,
        31,
       473,
       536,
       369,
       718,
       683,
       949,
       900,
       515,
       178,
       658,
       314,
       584,
       491,
       304,
       494,
       932,
       531,
       150,
       398,
        10,
       863,
       957,
       198,
       973,
       565,
       465,
       462,
        24,
       517,
       672,
       328,
       923,
        54,
        47,
       861,
       123,
       252,
       797,
       309,
       243,
       663,
       471,
       104,
        53,
       850,
       218,
       996,
       445,
       143,
       581,
       391,
       512,
       803,
       787,
       244,
       591,
       775,
       497,
       225,
        72,
       535,
       614,
       466,
       216,
       257,
       366,
       389,
       961,
       220,
       690,
       951,
       945,
       943,
       285,
       569,
       307,
        12,
       852,
       586,
       809,
       784,
       902,
       671,
       107,
         4,
       440,
       294,
       350,
       287,
       965,
       184,
       541,
       647,
       665,
       838,
       360,
         7,
       985,
       523,
       144,
       544,
       744,
       264,
       653,
       667,
       646,
       882,
       173,
       807,
       381,
        74,
       979,
       403,
       332,
       320,
       575,
       832,
       999,
       808,
       425,
       978,
       705,
       764,
        80,
       640,
       880,
       511,
        57,
       280,
       308,
       362,
       351,
       461,
       856,
       160,
       367,
        94,
       103,
       648,
       281,
       800,
       563,
         9,
       219,
       725,
        89,
        58,
       174,
       619,
       129,
       125,
       805,
       711,
       740,
       847,
       177,
        73,
       479,
       454,
       124,
       974,
       113,
       298,
       860,
       967,
       813,
       411,
       630,
       676,
       259,
       502,
       368,
       343,
       607,
       717,
       855,
       299,
       675,
       383,
       145,
       624,
       754,
       841,
       460,
       141,
       194,
       138,
        48,
       866,
       496,
       990,
       375,
       937,
       450,
       772,
       193,
       976,
       567,
       864,
       427,
       881,
       227,
       926,
       925,
       894,
       634,
       649,
       223,
       698,
       834,
       995,
       221,
       780,
       933,
       816,
       868,
       893,
       657,
        95,
       265,
       379,
       674,
        98,
        488,
        783,
        204]
    radixsort(arr, 0, arr.length - 1);
    console.log(arr);
}

main();