# Wizards-Unite-Api

A RESTful API built with Express and Knex for spells and foundables in the mobile game Harry Potter: Wizards Unite.

## Documentation

(Deployed at https://wizards-unite-api.herokuapp.com)

### List All Spells

`GET /api/v1/spells`

#### Paramenters

None

#### Sample Response 
```
Status: 200 OK
```
 ```
[
  {
    id: 1,
    name: "Accio",
    description: "Summons an object towards the caster.",
    image_URL: "https://wizardsunitehub.info/wp-content/uploads/2019/04/spellpath_accio_light.png",
    created_at: "2019-06-30T02:41:32.372Z",
    updated_at: "2019-06-30T02:41:32.372Z"
  },
  {
    id: 2,
    name: "Aguamenti",
    description: "Produces a clean, drinkable jet of water from the wand tip.",
    image_URL: "https://wizardsunitehub.info/wp-content/uploads/2019/04/spellpath_aguamenti_3_light.png",
    created_at: "2019-06-30T02:41:32.379Z",
    updated_at: "2019-06-30T02:41:32.379Z"
  },
  ...
]
```

### List All Foundables

`GET /api/v1/foundables`

#### Paramenters

None

#### Sample Response 
```
Status: 200 OK
```
```
[
  {
    id: 1,
    name: "Flesh-Eating Slugs",
    family: "Dark Arts",
    page: "Borgin & Burkes",
    threat_level: "Low",
    description: "Flesh-Eating Slugs are a breed of magical garden slugs, commonly found in Great Britain. Their mucus has a corrosive effect on the skin, and it is recommended to use a specialized repellent to deal with these pests.",
    image_URL: "https://wizardsunitehub.info/wp-content/uploads/2019/04/ui_registry_family02_pg01_sticker05_returned.png",
    spell_id: 1,
    created_at: "2019-06-30T02:41:32.425Z",
    updated_at: "2019-06-30T02:41:32.425Z"
  },
  {
    id: 2,
    name: "Acromantula Eggs",
    family: "Care of Magical Creatures",
    page: "Pumpkin Patch",
    threat_level: "Low",
    description: "Acromantula Eggs are Class A Non-Tradeable Goods. Females can lay up to one hundred eggs at a time, and the eggs are roughly the size of beach balls.",
    image_URL: "https://wizardsunitehub.info/wp-content/uploads/2019/04/ui_registry_family03_pg01_sticker05_returned.png",
    spell_id: 1,
    created_at: "2019-06-30T02:41:32.424Z",
    updated_at: "2019-06-30T02:41:32.424Z"
  },
  ...
]
```

### Get Spell

`GET /api/v1/spells/:id`

#### Paramenters

None

#### Sample Response 
```
Status: 200 OK
```
 ```
{
  id: 1,
  name: "Accio",
  description: "Summons an object towards the caster.",
  image_URL: "https://wizardsunitehub.info/wp-content/uploads/2019/04/spellpath_accio_light.png",
  created_at: "2019-06-30T02:41:32.372Z",
  updated_at: "2019-06-30T02:41:32.372Z"
}
```

### Get Foundable

`GET /api/v1/foundable/:id`

#### Paramenters

None

#### Sample Response 
```
Status: 200 OK
```
 ```
{
  id: 1,
  name: "Flesh-Eating Slugs",
  family: "Dark Arts",
  page: "Borgin & Burkes",
  threat_level: "Low",
  description: "Flesh-Eating Slugs are a breed of magical garden slugs, commonly found in Great Britain. Their mucus has a corrosive effect on the skin, and it is recommended to use a specialized repellent to deal with these pests.",
  image_URL: "https://wizardsunitehub.info/wp-content/uploads/2019/04/ui_registry_family02_pg01_sticker05_returned.png",
  spell_id: 1,
  created_at: "2019-06-30T02:41:32.425Z",
  updated_at: "2019-06-30T02:41:32.425Z"
}
```

### Create Spell

`POST /api/v1/spells`

#### Paramenters

| Name         | Type    | Description                         |
| ------------ |---------| ------------                        |
| `name`       | `string`| Name of the spell                   |
| `description`| `string`| Description of the spell's behavior |
| `image_url`  | `string`| External link to image file         |

#### Sample Response 
```
Status: 201 Created
```
 ```
{
	id: 17
}
```

### Create Foundable

`POST /api/v1/foundables`

#### Paramenters

| Name         | Type    | Description                                            |
| ------------ |---------| ------------                                           |
| `name`       | `string`| Name of the foundable                                  |
| `family`     | `string`| Which family it belongs to in the registry             |
| `page`       | `string`| Which page of the registry this foundable is placed on |
| `threat_level`| `string`| Where the founable falls on the threat scale          |
| `description`| `string`| Description of the spell's behavior                    |
| `image_url`  | `string`| External link to image file                            |
| `spell`       | `string`| The name of the spell used on this foundable          |


#### Sample Response 
```
Status: 201 Created
```
 ```
{
	id: 32
}
```

### Delete Foundable

`DELETE /api/v1/foundable/:id`

#### Paramenters

None

#### Sample Response 
```
Status: 204 No Content
```
