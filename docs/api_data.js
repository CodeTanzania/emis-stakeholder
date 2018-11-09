define({ "api": [
  {
    "type": "delete",
    "url": "/parties/:id",
    "title": "Delete Existing Party",
    "version": "1.0.0",
    "name": "DeleteParty",
    "group": "Party",
    "description": "<p>Delete existing party</p>",
    "filename": "lib/party.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://emis-stakeholders.herokuapp.com/v1/parties/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique party identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "party",
            "defaultValue": "undefined",
            "description": "<p>Top party(i.e company, organization etc) under which a party is derived(or member, part of etc).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "type",
            "defaultValue": "Other",
            "description": "<p>Human readable type of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": true,
            "field": "phases",
            "defaultValue": "Mitigation",
            "description": "<p>Participatory phases of a party in disaster management.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Human readable name of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "nickname",
            "description": "<p>Human readable alternative or well known name of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "abbreviation",
            "defaultValue": "undefined",
            "description": "<p>Human readable short form of a party name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "title",
            "defaultValue": "undefined",
            "description": "<p>Human readable profession, occupation or job title of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "about",
            "defaultValue": "undefined",
            "description": "<p>A brief summary about a party if available i.e additional details that clarify what a party do.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "locale",
            "defaultValue": "en",
            "description": "<p>Defines the party's language, region and any special variant preferences.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "timezone",
            "defaultValue": "undefined",
            "description": "<p>Defines timezone of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Primary email address used to contact a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mobile",
            "description": "<p>Primary mobile phone number used to contact a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "landline",
            "defaultValue": "undefined",
            "description": "<p>Primary main-line(or fixed-line) phone number used to contact a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "fax",
            "defaultValue": "undefined",
            "description": "<p>Primary fax number used to contact a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "website",
            "defaultValue": "undefined",
            "description": "<p>Primary website url(or link) of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "avatar",
            "defaultValue": "undefined",
            "description": "<p>Image(logo, face or emblem) of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "physicalAddress",
            "defaultValue": "undefined",
            "description": "<p>Primary physical address of party office.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "postalAddress",
            "defaultValue": "undefined",
            "description": "<p>Primary postal address of party office.</p>"
          },
          {
            "group": "Success 200",
            "type": "Point",
            "optional": true,
            "field": "location",
            "defaultValue": "undefined",
            "description": "<p>A geo-location cetroid of a party operational boundaries.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "role",
            "defaultValue": "undefined",
            "description": "<p>Assignable or given roles that permits(or give access rights) to a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": true,
            "field": "members",
            "defaultValue": "undefined",
            "description": "<p>List of parties belongs to this party.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when party was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when party was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"5b5d92da476363251e13e0f4\",\n  \"type\": \"Agency\",\n  \"name\": \"Bedfordshire\",\n  \"mobile\": \"(943) 902-6124\",\n  \"landline\": \"661-575-8596\",\n  \"fax\": \"945.952.6154 x857\",\n  \"email\": \"arely.kuvalis@gmail.com\",\n  \"website\": \"julian.name\",\n  \"about\": \"Labore aut corrupti et. Doloribus animi quidem ratione.\",\n  \"phases\": [\n    \"Mitigation\",\n    \"Response\"\n  ],\n  \"updatedAt\": \"2018-07-29T10:11:38.110Z\",\n  \"createdAt\": \"2018-07-29T10:11:38.110Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/parties",
    "title": "List Parties",
    "version": "1.0.0",
    "name": "GetParties",
    "group": "Party",
    "description": "<p>Returns a list of parties</p>",
    "filename": "lib/party.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://emis-stakeholders.herokuapp.com/v1/parties"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of parties</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data._id",
            "description": "<p>Unique party identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.party",
            "defaultValue": "undefined",
            "description": "<p>Top party(i.e company, organization etc) under which a party is derived(or member, part of etc).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.type",
            "defaultValue": "Other",
            "description": "<p>Human readable type of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": true,
            "field": "phases",
            "defaultValue": "Mitigation",
            "description": "<p>Participatory phases of a party in disaster management.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>Human readable name of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.nickname",
            "description": "<p>Human readable alternative or well known name of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.abbreviation",
            "defaultValue": "undefined",
            "description": "<p>Human readable short form of a party name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.title",
            "defaultValue": "undefined",
            "description": "<p>Human readable profession, occupation or job title of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.about",
            "defaultValue": "undefined",
            "description": "<p>A brief summary about a party if available i.e additional details that clarify what a party do.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.locale",
            "defaultValue": "en",
            "description": "<p>Defines the party's language, region and any special variant preferences.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.timezone",
            "defaultValue": "undefined",
            "description": "<p>Defines timezone of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.email",
            "description": "<p>Primary email address used to contact a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.mobile",
            "description": "<p>Primary mobile phone number used to contact a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.landline",
            "defaultValue": "undefined",
            "description": "<p>Primary main-line(or fixed-line) phone number used to contact a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.fax",
            "defaultValue": "undefined",
            "description": "<p>Primary fax number used to contact a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.website",
            "defaultValue": "undefined",
            "description": "<p>Primary website url(or link) of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.avatar",
            "defaultValue": "undefined",
            "description": "<p>Image(logo, face or emblem) of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "physicalAddress",
            "defaultValue": "undefined",
            "description": "<p>Primary physical address of party office.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "postalAddress",
            "defaultValue": "undefined",
            "description": "<p>Primary postal address of party office.</p>"
          },
          {
            "group": "Success 200",
            "type": "Point",
            "optional": true,
            "field": "data.location",
            "defaultValue": "undefined",
            "description": "<p>A geo-location cetroid of a party operational boundaries.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "data.role",
            "defaultValue": "undefined",
            "description": "<p>Assignable or given roles that permits(or give access rights) to a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": true,
            "field": "data.members",
            "defaultValue": "undefined",
            "description": "<p>List of parties belongs to this party.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.createdAt",
            "description": "<p>Date when party was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.updatedAt",
            "description": "<p>Date when party was last updated</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>Total number of parties</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>Number of parties returned</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Query limit used</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "skip",
            "description": "<p>Query skip/offset used</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Page number</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pages",
            "description": "<p>Total number of pages</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "lastModified",
            "description": "<p>Date and time at which latest party was last modified</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": [\n    {\n      \"_id\": \"5b5d92da476363251e13e0f4\",\n      \"type\": \"Agency\",\n      \"name\": \"Bedfordshire\",\n      \"phone\": \"(943) 902-6124\",\n      \"landline\": \"661-575-8596\",\n      \"fax\": \"945.952.6154 x857\",\n      \"email\": \"arely.kuvalis@gmail.com\",\n      \"website\": \"julian.name\",\n      \"about\": \"Labore aut corrupti et. Doloribus animi quidem ratione.\",\n      \"phases\": [\n        \"Mitigation\",\n        \"Response\"\n      ],\n      \"updatedAt\": \"2018-07-29T10:11:38.110Z\",\n      \"createdAt\": \"2018-07-29T10:11:38.110Z\"\n    }\n  ],\n  \"total\": 20,\n  \"size\": 10,\n  \"limit\": 10,\n  \"skip\": 0,\n  \"page\": 1,\n  \"pages\": 2,\n  \"lastModified\": \"2018-07-29T10:11:38.111Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/parties/:id",
    "title": "Get Existing Party",
    "version": "1.0.0",
    "name": "GetParty",
    "group": "Party",
    "description": "<p>Get existing party</p>",
    "filename": "lib/party.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://emis-stakeholders.herokuapp.com/v1/parties/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique party identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "party",
            "defaultValue": "undefined",
            "description": "<p>Top party(i.e company, organization etc) under which a party is derived(or member, part of etc).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "type",
            "defaultValue": "Other",
            "description": "<p>Human readable type of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": true,
            "field": "phases",
            "defaultValue": "Mitigation",
            "description": "<p>Participatory phases of a party in disaster management.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Human readable name of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "nickname",
            "description": "<p>Human readable alternative or well known name of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "abbreviation",
            "defaultValue": "undefined",
            "description": "<p>Human readable short form of a party name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "title",
            "defaultValue": "undefined",
            "description": "<p>Human readable profession, occupation or job title of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "about",
            "defaultValue": "undefined",
            "description": "<p>A brief summary about a party if available i.e additional details that clarify what a party do.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "locale",
            "defaultValue": "en",
            "description": "<p>Defines the party's language, region and any special variant preferences.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "timezone",
            "defaultValue": "undefined",
            "description": "<p>Defines timezone of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Primary email address used to contact a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mobile",
            "description": "<p>Primary mobile phone number used to contact a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "landline",
            "defaultValue": "undefined",
            "description": "<p>Primary main-line(or fixed-line) phone number used to contact a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "fax",
            "defaultValue": "undefined",
            "description": "<p>Primary fax number used to contact a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "website",
            "defaultValue": "undefined",
            "description": "<p>Primary website url(or link) of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "avatar",
            "defaultValue": "undefined",
            "description": "<p>Image(logo, face or emblem) of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "physicalAddress",
            "defaultValue": "undefined",
            "description": "<p>Primary physical address of party office.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "postalAddress",
            "defaultValue": "undefined",
            "description": "<p>Primary postal address of party office.</p>"
          },
          {
            "group": "Success 200",
            "type": "Point",
            "optional": true,
            "field": "location",
            "defaultValue": "undefined",
            "description": "<p>A geo-location cetroid of a party operational boundaries.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "role",
            "defaultValue": "undefined",
            "description": "<p>Assignable or given roles that permits(or give access rights) to a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": true,
            "field": "members",
            "defaultValue": "undefined",
            "description": "<p>List of parties belongs to this party.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when party was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when party was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"5b5d92da476363251e13e0f4\",\n  \"type\": \"Agency\",\n  \"name\": \"Bedfordshire\",\n  \"mobile\": \"(943) 902-6124\",\n  \"landline\": \"661-575-8596\",\n  \"fax\": \"945.952.6154 x857\",\n  \"email\": \"arely.kuvalis@gmail.com\",\n  \"website\": \"julian.name\",\n  \"about\": \"Labore aut corrupti et. Doloribus animi quidem ratione.\",\n  \"phases\": [\n    \"Mitigation\",\n    \"Response\"\n  ],\n  \"updatedAt\": \"2018-07-29T10:11:38.110Z\",\n  \"createdAt\": \"2018-07-29T10:11:38.110Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/parties/schema",
    "title": "Get Party Schema",
    "version": "1.0.0",
    "name": "GetPartySchema",
    "group": "Party",
    "description": "<p>Returns party json schema definition</p>",
    "filename": "lib/party.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://emis-stakeholders.herokuapp.com/v1/parties/schema"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/parties/:party/parties",
    "title": "List Sub-Parties",
    "version": "1.0.0",
    "name": "GetSubParties",
    "group": "Party",
    "description": "<p>Returns a list of sub-parties</p>",
    "filename": "lib/party.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://emis-stakeholders.herokuapp.com/v1/parties/:party/parties"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of parties</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data._id",
            "description": "<p>Unique party identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.party",
            "defaultValue": "undefined",
            "description": "<p>Top party(i.e company, organization etc) under which a party is derived(or member, part of etc).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.type",
            "defaultValue": "Other",
            "description": "<p>Human readable type of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": true,
            "field": "phases",
            "defaultValue": "Mitigation",
            "description": "<p>Participatory phases of a party in disaster management.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>Human readable name of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.nickname",
            "description": "<p>Human readable alternative or well known name of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.abbreviation",
            "defaultValue": "undefined",
            "description": "<p>Human readable short form of a party name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.title",
            "defaultValue": "undefined",
            "description": "<p>Human readable profession, occupation or job title of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.about",
            "defaultValue": "undefined",
            "description": "<p>A brief summary about a party if available i.e additional details that clarify what a party do.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.locale",
            "defaultValue": "en",
            "description": "<p>Defines the party's language, region and any special variant preferences.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.timezone",
            "defaultValue": "undefined",
            "description": "<p>Defines timezone of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.email",
            "description": "<p>Primary email address used to contact a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.mobile",
            "description": "<p>Primary mobile phone number used to contact a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.landline",
            "defaultValue": "undefined",
            "description": "<p>Primary main-line(or fixed-line) phone number used to contact a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.fax",
            "defaultValue": "undefined",
            "description": "<p>Primary fax number used to contact a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.website",
            "defaultValue": "undefined",
            "description": "<p>Primary website url(or link) of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.avatar",
            "defaultValue": "undefined",
            "description": "<p>Image(logo, face or emblem) of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "physicalAddress",
            "defaultValue": "undefined",
            "description": "<p>Primary physical address of party office.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "postalAddress",
            "defaultValue": "undefined",
            "description": "<p>Primary postal address of party office.</p>"
          },
          {
            "group": "Success 200",
            "type": "Point",
            "optional": true,
            "field": "data.location",
            "defaultValue": "undefined",
            "description": "<p>A geo-location cetroid of a party operational boundaries.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "data.role",
            "defaultValue": "undefined",
            "description": "<p>Assignable or given roles that permits(or give access rights) to a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": true,
            "field": "data.members",
            "defaultValue": "undefined",
            "description": "<p>List of parties belongs to this party.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.createdAt",
            "description": "<p>Date when party was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.updatedAt",
            "description": "<p>Date when party was last updated</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>Total number of parties</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>Number of parties returned</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Query limit used</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "skip",
            "description": "<p>Query skip/offset used</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Page number</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pages",
            "description": "<p>Total number of pages</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "lastModified",
            "description": "<p>Date and time at which latest party was last modified</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": [\n    {\n      \"_id\": \"5b5d92da476363251e13e0f4\",\n      \"type\": \"Agency\",\n      \"name\": \"Bedfordshire\",\n      \"phone\": \"(943) 902-6124\",\n      \"landline\": \"661-575-8596\",\n      \"fax\": \"945.952.6154 x857\",\n      \"email\": \"arely.kuvalis@gmail.com\",\n      \"website\": \"julian.name\",\n      \"about\": \"Labore aut corrupti et. Doloribus animi quidem ratione.\",\n      \"phases\": [\n        \"Mitigation\",\n        \"Response\"\n      ],\n      \"updatedAt\": \"2018-07-29T10:11:38.110Z\",\n      \"createdAt\": \"2018-07-29T10:11:38.110Z\"\n    }\n  ],\n  \"total\": 20,\n  \"size\": 10,\n  \"limit\": 10,\n  \"skip\": 0,\n  \"page\": 1,\n  \"pages\": 2,\n  \"lastModified\": \"2018-07-29T10:11:38.111Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "patch",
    "url": "/parties/:id",
    "title": "Patch Existing Party",
    "version": "1.0.0",
    "name": "PatchParty",
    "group": "Party",
    "description": "<p>Patch existing party</p>",
    "filename": "lib/party.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://emis-stakeholders.herokuapp.com/v1/parties/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique party identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "party",
            "defaultValue": "undefined",
            "description": "<p>Top party(i.e company, organization etc) under which a party is derived(or member, part of etc).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "type",
            "defaultValue": "Other",
            "description": "<p>Human readable type of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": true,
            "field": "phases",
            "defaultValue": "Mitigation",
            "description": "<p>Participatory phases of a party in disaster management.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Human readable name of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "nickname",
            "description": "<p>Human readable alternative or well known name of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "abbreviation",
            "defaultValue": "undefined",
            "description": "<p>Human readable short form of a party name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "title",
            "defaultValue": "undefined",
            "description": "<p>Human readable profession, occupation or job title of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "about",
            "defaultValue": "undefined",
            "description": "<p>A brief summary about a party if available i.e additional details that clarify what a party do.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "locale",
            "defaultValue": "en",
            "description": "<p>Defines the party's language, region and any special variant preferences.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "timezone",
            "defaultValue": "undefined",
            "description": "<p>Defines timezone of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Primary email address used to contact a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mobile",
            "description": "<p>Primary mobile phone number used to contact a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "landline",
            "defaultValue": "undefined",
            "description": "<p>Primary main-line(or fixed-line) phone number used to contact a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "fax",
            "defaultValue": "undefined",
            "description": "<p>Primary fax number used to contact a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "website",
            "defaultValue": "undefined",
            "description": "<p>Primary website url(or link) of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "avatar",
            "defaultValue": "undefined",
            "description": "<p>Image(logo, face or emblem) of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "physicalAddress",
            "defaultValue": "undefined",
            "description": "<p>Primary physical address of party office.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "postalAddress",
            "defaultValue": "undefined",
            "description": "<p>Primary postal address of party office.</p>"
          },
          {
            "group": "Success 200",
            "type": "Point",
            "optional": true,
            "field": "location",
            "defaultValue": "undefined",
            "description": "<p>A geo-location cetroid of a party operational boundaries.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "role",
            "defaultValue": "undefined",
            "description": "<p>Assignable or given roles that permits(or give access rights) to a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": true,
            "field": "members",
            "defaultValue": "undefined",
            "description": "<p>List of parties belongs to this party.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when party was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when party was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"5b5d92da476363251e13e0f4\",\n  \"type\": \"Agency\",\n  \"name\": \"Bedfordshire\",\n  \"mobile\": \"(943) 902-6124\",\n  \"landline\": \"661-575-8596\",\n  \"fax\": \"945.952.6154 x857\",\n  \"email\": \"arely.kuvalis@gmail.com\",\n  \"website\": \"julian.name\",\n  \"about\": \"Labore aut corrupti et. Doloribus animi quidem ratione.\",\n  \"phases\": [\n    \"Mitigation\",\n    \"Response\"\n  ],\n  \"updatedAt\": \"2018-07-29T10:11:38.110Z\",\n  \"createdAt\": \"2018-07-29T10:11:38.110Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/notifications",
    "title": "Create New Notification",
    "version": "1.0.0",
    "name": "PostNotification",
    "group": "Party",
    "description": "<p>Send new notification to parties</p>",
    "filename": "lib/party.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://emis-stakeholders.herokuapp.com/v1/notifications"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/parties",
    "title": "Create New Party",
    "version": "1.0.0",
    "name": "PostParty",
    "group": "Party",
    "description": "<p>Create new party</p>",
    "filename": "lib/party.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://emis-stakeholders.herokuapp.com/v1/parties"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique party identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "party",
            "defaultValue": "undefined",
            "description": "<p>Top party(i.e company, organization etc) under which a party is derived(or member, part of etc).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "type",
            "defaultValue": "Other",
            "description": "<p>Human readable type of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": true,
            "field": "phases",
            "defaultValue": "Mitigation",
            "description": "<p>Participatory phases of a party in disaster management.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Human readable name of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "nickname",
            "description": "<p>Human readable alternative or well known name of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "abbreviation",
            "defaultValue": "undefined",
            "description": "<p>Human readable short form of a party name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "title",
            "defaultValue": "undefined",
            "description": "<p>Human readable profession, occupation or job title of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "about",
            "defaultValue": "undefined",
            "description": "<p>A brief summary about a party if available i.e additional details that clarify what a party do.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "locale",
            "defaultValue": "en",
            "description": "<p>Defines the party's language, region and any special variant preferences.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "timezone",
            "defaultValue": "undefined",
            "description": "<p>Defines timezone of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Primary email address used to contact a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mobile",
            "description": "<p>Primary mobile phone number used to contact a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "landline",
            "defaultValue": "undefined",
            "description": "<p>Primary main-line(or fixed-line) phone number used to contact a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "fax",
            "defaultValue": "undefined",
            "description": "<p>Primary fax number used to contact a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "website",
            "defaultValue": "undefined",
            "description": "<p>Primary website url(or link) of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "avatar",
            "defaultValue": "undefined",
            "description": "<p>Image(logo, face or emblem) of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "physicalAddress",
            "defaultValue": "undefined",
            "description": "<p>Primary physical address of party office.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "postalAddress",
            "defaultValue": "undefined",
            "description": "<p>Primary postal address of party office.</p>"
          },
          {
            "group": "Success 200",
            "type": "Point",
            "optional": true,
            "field": "location",
            "defaultValue": "undefined",
            "description": "<p>A geo-location cetroid of a party operational boundaries.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "role",
            "defaultValue": "undefined",
            "description": "<p>Assignable or given roles that permits(or give access rights) to a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": true,
            "field": "members",
            "defaultValue": "undefined",
            "description": "<p>List of parties belongs to this party.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when party was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when party was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"5b5d92da476363251e13e0f4\",\n  \"type\": \"Agency\",\n  \"name\": \"Bedfordshire\",\n  \"mobile\": \"(943) 902-6124\",\n  \"landline\": \"661-575-8596\",\n  \"fax\": \"945.952.6154 x857\",\n  \"email\": \"arely.kuvalis@gmail.com\",\n  \"website\": \"julian.name\",\n  \"about\": \"Labore aut corrupti et. Doloribus animi quidem ratione.\",\n  \"phases\": [\n    \"Mitigation\",\n    \"Response\"\n  ],\n  \"updatedAt\": \"2018-07-29T10:11:38.110Z\",\n  \"createdAt\": \"2018-07-29T10:11:38.110Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/parties/:id",
    "title": "Put Existing Party",
    "version": "1.0.0",
    "name": "PutParty",
    "group": "Party",
    "description": "<p>Put existing party</p>",
    "filename": "lib/party.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://emis-stakeholders.herokuapp.com/v1/parties/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique party identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "party",
            "defaultValue": "undefined",
            "description": "<p>Top party(i.e company, organization etc) under which a party is derived(or member, part of etc).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "type",
            "defaultValue": "Other",
            "description": "<p>Human readable type of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": true,
            "field": "phases",
            "defaultValue": "Mitigation",
            "description": "<p>Participatory phases of a party in disaster management.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Human readable name of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "nickname",
            "description": "<p>Human readable alternative or well known name of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "abbreviation",
            "defaultValue": "undefined",
            "description": "<p>Human readable short form of a party name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "title",
            "defaultValue": "undefined",
            "description": "<p>Human readable profession, occupation or job title of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "about",
            "defaultValue": "undefined",
            "description": "<p>A brief summary about a party if available i.e additional details that clarify what a party do.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "locale",
            "defaultValue": "en",
            "description": "<p>Defines the party's language, region and any special variant preferences.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "timezone",
            "defaultValue": "undefined",
            "description": "<p>Defines timezone of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Primary email address used to contact a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mobile",
            "description": "<p>Primary mobile phone number used to contact a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "landline",
            "defaultValue": "undefined",
            "description": "<p>Primary main-line(or fixed-line) phone number used to contact a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "fax",
            "defaultValue": "undefined",
            "description": "<p>Primary fax number used to contact a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "website",
            "defaultValue": "undefined",
            "description": "<p>Primary website url(or link) of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "avatar",
            "defaultValue": "undefined",
            "description": "<p>Image(logo, face or emblem) of a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "physicalAddress",
            "defaultValue": "undefined",
            "description": "<p>Primary physical address of party office.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "postalAddress",
            "defaultValue": "undefined",
            "description": "<p>Primary postal address of party office.</p>"
          },
          {
            "group": "Success 200",
            "type": "Point",
            "optional": true,
            "field": "location",
            "defaultValue": "undefined",
            "description": "<p>A geo-location cetroid of a party operational boundaries.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "role",
            "defaultValue": "undefined",
            "description": "<p>Assignable or given roles that permits(or give access rights) to a party.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": true,
            "field": "members",
            "defaultValue": "undefined",
            "description": "<p>List of parties belongs to this party.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when party was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when party was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"5b5d92da476363251e13e0f4\",\n  \"type\": \"Agency\",\n  \"name\": \"Bedfordshire\",\n  \"mobile\": \"(943) 902-6124\",\n  \"landline\": \"661-575-8596\",\n  \"fax\": \"945.952.6154 x857\",\n  \"email\": \"arely.kuvalis@gmail.com\",\n  \"website\": \"julian.name\",\n  \"about\": \"Labore aut corrupti et. Doloribus animi quidem ratione.\",\n  \"phases\": [\n    \"Mitigation\",\n    \"Response\"\n  ],\n  \"updatedAt\": \"2018-07-29T10:11:38.110Z\",\n  \"createdAt\": \"2018-07-29T10:11:38.110Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/permissions/:id",
    "title": "Get Existing Permission",
    "version": "1.0.0",
    "name": "GetPermission",
    "group": "Permission",
    "description": "<p>Get existing permission</p>",
    "filename": "node_modules/@lykmapipo/permission/lib/permission.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://emis-stakeholders.herokuapp.com/v1/permissions/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique permission identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "resource",
            "description": "<p>Resource constrained by a permission</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>Action(or permit) constrained(or granted) by a permission</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>A brief summary about a permission if available i.e additional details that clarify what a permission for</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "wildcard",
            "description": "<p>System generated unique identifier of a permission</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when permission was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when permission was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"5b622350480e576243f10d8b\",\n  \"resource\": \"Task\",\n  \"action\": \"create\",\n  \"description\": \"In quos quae sed consectetur voluptas praesentium.\",\n  \"wildcard\": \"task:create\",\n  \"updatedAt\": \"2018-08-01T21:17:04.729Z\",\n  \"createdAt\": \"2018-08-01T21:17:04.729Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/permissions/schema",
    "title": "Get Permission Schema",
    "version": "1.0.0",
    "name": "GetPermissionSchema",
    "group": "Permission",
    "description": "<p>Returns permission json schema definition</p>",
    "filename": "node_modules/@lykmapipo/permission/lib/permission.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://emis-stakeholders.herokuapp.com/v1/permissions/schema"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/permissions",
    "title": "List Permissions",
    "version": "1.0.0",
    "name": "GetPermissions",
    "group": "Permission",
    "description": "<p>Returns a list of permissions</p>",
    "filename": "node_modules/@lykmapipo/permission/lib/permission.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://emis-stakeholders.herokuapp.com/v1/permissions"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of permissions</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data._id",
            "description": "<p>Unique permission identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.resource",
            "description": "<p>Resource constrained by a permission</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.action",
            "description": "<p>Action(or permit) constrained(or granted) by a permission</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.description",
            "description": "<p>A brief summary about a permission if available i.e additional details that clarify what a permission for</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.wildcard",
            "description": "<p>System generated unique identifier of a permission</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.createdAt",
            "description": "<p>Date when permission was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.updatedAt",
            "description": "<p>Date when permission was last updated</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>Total number of permission</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>Number of permissions returned</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Query limit used</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "skip",
            "description": "<p>Query skip/offset used</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Page number</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pages",
            "description": "<p>Total number of pages</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "lastModified",
            "description": "<p>Date and time at which latest permission was last modified</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": [\n    {\n      \"_id\": \"5b622350480e576243f10d8b\",\n      \"resource\": \"Task\",\n      \"action\": \"create\",\n      \"description\": \"In quos quae sed consectetur voluptas praesentium.\",\n      \"wildcard\": \"task:create\",\n      \"updatedAt\": \"2018-08-01T21:17:04.729Z\",\n      \"createdAt\": \"2018-08-01T21:17:04.729Z\"\n    }\n  ],\n  \"total\": 20,\n  \"size\": 10,\n  \"limit\": 10,\n  \"skip\": 0,\n  \"page\": 1,\n  \"pages\": 2,\n  \"lastModified\": \"2018-07-29T10:11:38.111Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "patch",
    "url": "/permissions/:id",
    "title": "Patch Existing Permission",
    "version": "1.0.0",
    "name": "PatchPermission",
    "group": "Permission",
    "description": "<p>Patch existing permission</p>",
    "filename": "node_modules/@lykmapipo/permission/lib/permission.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://emis-stakeholders.herokuapp.com/v1/permissions/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique permission identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "resource",
            "description": "<p>Resource constrained by a permission</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>Action(or permit) constrained(or granted) by a permission</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>A brief summary about a permission if available i.e additional details that clarify what a permission for</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "wildcard",
            "description": "<p>System generated unique identifier of a permission</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when permission was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when permission was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"5b622350480e576243f10d8b\",\n  \"resource\": \"Task\",\n  \"action\": \"create\",\n  \"description\": \"In quos quae sed consectetur voluptas praesentium.\",\n  \"wildcard\": \"task:create\",\n  \"updatedAt\": \"2018-08-01T21:17:04.729Z\",\n  \"createdAt\": \"2018-08-01T21:17:04.729Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/permissions/:id",
    "title": "Put Existing Permission",
    "version": "1.0.0",
    "name": "PutPermission",
    "group": "Permission",
    "description": "<p>Put existing permission</p>",
    "filename": "node_modules/@lykmapipo/permission/lib/permission.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://emis-stakeholders.herokuapp.com/v1/permissions/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique permission identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "resource",
            "description": "<p>Resource constrained by a permission</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>Action(or permit) constrained(or granted) by a permission</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>A brief summary about a permission if available i.e additional details that clarify what a permission for</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "wildcard",
            "description": "<p>System generated unique identifier of a permission</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when permission was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when permission was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"5b622350480e576243f10d8b\",\n  \"resource\": \"Task\",\n  \"action\": \"create\",\n  \"description\": \"In quos quae sed consectetur voluptas praesentium.\",\n  \"wildcard\": \"task:create\",\n  \"updatedAt\": \"2018-08-01T21:17:04.729Z\",\n  \"createdAt\": \"2018-08-01T21:17:04.729Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/roles/:id",
    "title": "Delete Existing Role",
    "version": "1.0.0",
    "name": "DeleteRole",
    "group": "Role",
    "description": "<p>Delete existing role</p>",
    "filename": "node_modules/@codetanzania/emis-role/lib/role.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://emis-stakeholders.herokuapp.com/v1/roles/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique role identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Unique human readable name of a role</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "abbreviation",
            "description": "<p>Human readable short form of a role.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>A brief summary about a role if available i.e additional details that clarify what a role for</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": true,
            "field": "responsibilities",
            "description": "<p>A duties, obligation or functions performed(or assigned) to a role.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": true,
            "field": "permissions",
            "description": "<p>List of defined permits(access rights) of a role</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when role was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when role was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"5b60785cc1ab060972b0442c\",\n  \"name\": \"Ward Executive Officer\",\n  \"abbreviation\": \"WEO\",\n  \"updatedAt\": \"2018-07-31T14:55:24.667Z\",\n  \"createdAt\": \"2018-07-31T14:55:24.667Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/roles/:id",
    "title": "Get Existing Role",
    "version": "1.0.0",
    "name": "GetRole",
    "group": "Role",
    "description": "<p>Get existing role</p>",
    "filename": "node_modules/@codetanzania/emis-role/lib/role.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://emis-stakeholders.herokuapp.com/v1/roles/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique role identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Unique human readable name of a role</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "abbreviation",
            "description": "<p>Human readable short form of a role.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>A brief summary about a role if available i.e additional details that clarify what a role for</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": true,
            "field": "responsibilities",
            "description": "<p>A duties, obligation or functions performed(or assigned) to a role.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": true,
            "field": "permissions",
            "description": "<p>List of defined permits(access rights) of a role</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when role was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when role was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"5b60785cc1ab060972b0442c\",\n  \"name\": \"Ward Executive Officer\",\n  \"abbreviation\": \"WEO\",\n  \"updatedAt\": \"2018-07-31T14:55:24.667Z\",\n  \"createdAt\": \"2018-07-31T14:55:24.667Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/roles/schema",
    "title": "Get Role Schema",
    "version": "1.0.0",
    "name": "GetRoleSchema",
    "group": "Role",
    "description": "<p>Returns role json schema definition</p>",
    "filename": "node_modules/@codetanzania/emis-role/lib/role.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://emis-stakeholders.herokuapp.com/v1/roles/schema"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/roles",
    "title": "List Roles",
    "version": "1.0.0",
    "name": "GetRoles",
    "group": "Role",
    "description": "<p>Returns a list of roles</p>",
    "filename": "node_modules/@codetanzania/emis-role/lib/role.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://emis-stakeholders.herokuapp.com/v1/roles"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of roles</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data._id",
            "description": "<p>Unique role identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>Unique human readable name of a role</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.abbreviation",
            "description": "<p>Human readable short form of a role.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.description",
            "description": "<p>A brief summary about a role if available i.e additional details that clarify what a role for</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": true,
            "field": "data.permissions",
            "description": "<p>List of defined permits(access rights) of a role</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": true,
            "field": "data.responsibilities",
            "description": "<p>A duties, obligation or functions performed(or assigned) to a role.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.createdAt",
            "description": "<p>Date when role was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.updatedAt",
            "description": "<p>Date when role was last updated</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>Total number of role</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>Number of roles returned</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Query limit used</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "skip",
            "description": "<p>Query skip/offset used</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Page number</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pages",
            "description": "<p>Total number of pages</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "lastModified",
            "description": "<p>Date and time at which latest role was last modified</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": [\n    {\n      \"_id\": \"5b60785cc1ab060972b0442c\",\n      \"name\": \"Ward Executive Officer\",\n      \"abbreviation\": \"WEO\",\n      \"updatedAt\": \"2018-07-31T14:55:24.667Z\",\n      \"createdAt\": \"2018-07-31T14:55:24.667Z\"\n    }\n  ],\n  \"total\": 20,\n  \"size\": 10,\n  \"limit\": 10,\n  \"skip\": 0,\n  \"page\": 1,\n  \"pages\": 2,\n  \"lastModified\": \"2018-07-29T10:11:38.111Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "patch",
    "url": "/roles/:id",
    "title": "Patch Existing Role",
    "version": "1.0.0",
    "name": "PatchRole",
    "group": "Role",
    "description": "<p>Patch existing role</p>",
    "filename": "node_modules/@codetanzania/emis-role/lib/role.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://emis-stakeholders.herokuapp.com/v1/roles/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique role identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Unique human readable name of a role</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "abbreviation",
            "description": "<p>Human readable short form of a role.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>A brief summary about a role if available i.e additional details that clarify what a role for</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": true,
            "field": "responsibilities",
            "description": "<p>A duties, obligation or functions performed(or assigned) to a role.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": true,
            "field": "permissions",
            "description": "<p>List of defined permits(access rights) of a role</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when role was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when role was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"5b60785cc1ab060972b0442c\",\n  \"name\": \"Ward Executive Officer\",\n  \"abbreviation\": \"WEO\",\n  \"updatedAt\": \"2018-07-31T14:55:24.667Z\",\n  \"createdAt\": \"2018-07-31T14:55:24.667Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/roles",
    "title": "Create New Role",
    "version": "1.0.0",
    "name": "PostRole",
    "group": "Role",
    "description": "<p>Create new role</p>",
    "filename": "node_modules/@codetanzania/emis-role/lib/role.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://emis-stakeholders.herokuapp.com/v1/roles"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique role identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Unique human readable name of a role</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "abbreviation",
            "description": "<p>Human readable short form of a role.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>A brief summary about a role if available i.e additional details that clarify what a role for</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": true,
            "field": "responsibilities",
            "description": "<p>A duties, obligation or functions performed(or assigned) to a role.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": true,
            "field": "permissions",
            "description": "<p>List of defined permits(access rights) of a role</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when role was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when role was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"5b60785cc1ab060972b0442c\",\n  \"name\": \"Ward Executive Officer\",\n  \"abbreviation\": \"WEO\",\n  \"updatedAt\": \"2018-07-31T14:55:24.667Z\",\n  \"createdAt\": \"2018-07-31T14:55:24.667Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/roles/:id",
    "title": "Put Existing Role",
    "version": "1.0.0",
    "name": "PutRole",
    "group": "Role",
    "description": "<p>Put existing role</p>",
    "filename": "node_modules/@codetanzania/emis-role/lib/role.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://emis-stakeholders.herokuapp.com/v1/roles/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique role identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Unique human readable name of a role</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "abbreviation",
            "description": "<p>Human readable short form of a role.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>A brief summary about a role if available i.e additional details that clarify what a role for</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": true,
            "field": "responsibilities",
            "description": "<p>A duties, obligation or functions performed(or assigned) to a role.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": true,
            "field": "permissions",
            "description": "<p>List of defined permits(access rights) of a role</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when role was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when role was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"5b60785cc1ab060972b0442c\",\n  \"name\": \"Ward Executive Officer\",\n  \"abbreviation\": \"WEO\",\n  \"updatedAt\": \"2018-07-31T14:55:24.667Z\",\n  \"createdAt\": \"2018-07-31T14:55:24.667Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  }
] });
