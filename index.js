
var express = require("express");
var cors = require('cors')
var jsonLookup = require('./calculator-feed/traits_guide.json')

var app = express();
app.use(cors());
var allowlist = ['https://mint.roseape.io', 'http://localhost:3000']
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get("/test", cors(corsOptionsDelegate), (req, res, next) => {
    res.json(["alvin", "calvin", "rachelle"]);
});

app.get("/metadata/:tokenId", cors(corsOptionsDelegate), (req, res, next) => {
    var tokenId = req.params.tokenId;
    var jsonData = require('./calculator-feed/roseape_data/' + tokenId + '.json');
    res.json(jsonData);
});

app.get("/metadata-traits/:tokenId", cors(corsOptionsDelegate), (req, res, next) => {
    var tokenId = req.params.tokenId;
    // get the ID of the user from the database
    var jsonData = require('./calculator-feed/roseape_data/' + tokenId + '.json')
    var totalSupply = jsonLookup["totalSupply"];
    //var totalSupply = 5555;
    var totalRarityScore = 0;
    var traitsResponse = {
        metadata: {
            name: jsonData["name"],
            description: jsonData["description"],
            image: jsonData["image"],
            attributes: jsonData["attributes"]
        },
        tokenId: tokenId,
        totalSupply: 0,
        traitRarityScores: {
            background: 0,
            baseape: 0,
            baseclothes: 0,
            earrings: 0,
            eyes: 0,
            headwear: 0,
            mouth: 0,
            roses: 0,
            necklace: 0,
            crypto: 0,
        },
        totalRarityScore: 0,
    }

    jsonData.attributes.forEach(function (attribute) {
        lookupName = attribute.trait_type + "_" + attribute.value;

        if (jsonLookup[lookupName] != undefined) {
            console.log(">>>>");
        }
        if (attribute.trait_type == "0background") {
            traitsResponse.traitRarityScores.background = 1 / (jsonLookup.traitsTotal[lookupName] / totalSupply);
        }
        if (attribute.trait_type == "1baseape") {
            traitsResponse.traitRarityScores.baseape = 1 / (jsonLookup.traitsTotal[lookupName] / totalSupply);
        }
        if (attribute.trait_type == "2baseclothes") {
            traitsResponse.traitRarityScores.baseclothes = 1 / (jsonLookup.traitsTotal[lookupName] / totalSupply);
        }
        if (attribute.trait_type == "3earrings") {
            traitsResponse.traitRarityScores.earrings = 1 / (jsonLookup.traitsTotal[lookupName] / totalSupply);
        }
        if (attribute.trait_type == "4eyes") {
            traitsResponse.traitRarityScores.eyes = 1 / (jsonLookup.traitsTotal[lookupName] / totalSupply);
        }
        if (attribute.trait_type == "5headwear") {
            traitsResponse.traitRarityScores.headwear = 1 / (jsonLookup.traitsTotal[lookupName] / totalSupply);
        }
        if (attribute.trait_type == "6mouth") {
            traitsResponse.traitRarityScores.mouth = 1 / (jsonLookup.traitsTotal[lookupName] / totalSupply);
        }
        if (attribute.trait_type == "7roses") {
            traitsResponse.traitRarityScores.roses = 1 / (jsonLookup.traitsTotal[lookupName] / totalSupply);
        }
        if (attribute.trait_type == "8necklace") {
            traitsResponse.traitRarityScores.necklace = 1 / (jsonLookup.traitsTotal[lookupName] / totalSupply);
        }
        if (attribute.trait_type == "9crypto") {
            traitsResponse.traitRarityScores.crypto = 1 / (jsonLookup.traitsTotal[lookupName] / totalSupply);
        }
    });

    for (var key in traitsResponse.traitRarityScores) {
        totalRarityScore += traitsResponse.traitRarityScores[key];
    }

    traitsResponse.totalRarityScore = totalRarityScore;
    traitsResponse.totalSupply = totalSupply;

    res.json(traitsResponse);
});

app.get("/traits/:tokenId", cors(corsOptionsDelegate), (req, res, next) => {
    var tokenId = req.params.tokenId;
    // get the ID of the user from the database
    var jsonData = require('./calculator-feed/roseape_data/' + tokenId + '.json')
    var totalSupply = jsonLookup["totalSupply"];
    //var totalSupply = 5555;
    var totalRarityScore = 0;
    var traitsResponse = {
        tokenId: tokenId,
        totalSupply: 0,
        traitRarityScores: {
            background: 0,
            baseape: 0,
            baseclothes: 0,
            earrings: 0,
            eyes: 0,
            headwear: 0,
            mouth: 0,
            roses: 0,
            necklace: 0,
            crypto: 0,
        },
        totalRarityScore: 0,
    }

    jsonData.attributes.forEach(function (attribute) {
        lookupName = attribute.trait_type + "_" + attribute.value;

        if (attribute.trait_type == "0background") {
            traitsResponse.traitRarityScores.background = 1 / (jsonLookup.traitsTotal[lookupName] / totalSupply);
        }
        if (attribute.trait_type == "1baseape") {
            traitsResponse.traitRarityScores.baseape = 1 / (jsonLookup.traitsTotal[lookupName] / totalSupply);
        }
        if (attribute.trait_type == "2baseclothes") {
            traitsResponse.traitRarityScores.baseclothes = 1 / (jsonLookup.traitsTotal[lookupName] / totalSupply);
        }
        if (attribute.trait_type == "3earrings") {
            traitsResponse.traitRarityScores.earrings = 1 / (jsonLookup.traitsTotal[lookupName] / totalSupply);
        }
        if (attribute.trait_type == "4eyes") {
            traitsResponse.traitRarityScores.eyes = 1 / (jsonLookup.traitsTotal[lookupName] / totalSupply);
        }
        if (attribute.trait_type == "5headwear") {
            traitsResponse.traitRarityScores.headwear = 1 / (jsonLookup.traitsTotal[lookupName] / totalSupply);
        }
        if (attribute.trait_type == "6mouth") {
            traitsResponse.traitRarityScores.mouth = 1 / (jsonLookup.traitsTotal[lookupName] / totalSupply);
        }
        if (attribute.trait_type == "7roses") {
            traitsResponse.traitRarityScores.roses = 1 / (jsonLookup.traitsTotal[lookupName] / totalSupply);
        }
        if (attribute.trait_type == "8necklace") {
            traitsResponse.traitRarityScores.necklace = 1 / (jsonLookup.traitsTotal[lookupName] / totalSupply);
        }
        if (attribute.trait_type == "9crypto") {
            traitsResponse.traitRarityScores.crypto = 1 / (jsonLookup.traitsTotal[lookupName] / totalSupply);
        }
    });

    for (var key in traitsResponse.traitRarityScores) {
        totalRarityScore += traitsResponse.traitRarityScores[key];
    }

    traitsResponse.totalRarityScore = totalRarityScore;
    traitsResponse.totalSupply = totalSupply;

    res.json(traitsResponse);
});

app.get("/traits-guideline", cors(corsOptionsDelegate), (req, res, next) => {
    res.json(jsonLookup);
});