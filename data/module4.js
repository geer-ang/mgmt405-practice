registerModule({
  "id": "m4",
  "title": "Module 4",
  "subtitle": "Game theory, oligopoly and collusion, market structures, taxes and tariffs, the minimum wage",
  "questions": [
    {
      "id": "m4-q01",
      "theme": "Dominant Strategy in a Two-Player Game",
      "source": "In-person lecture: Game theory (best response and dominant strategy)",
      "kind": "numeric",
      "stem": "Canter's Deli and Langer's Deli are two of the best-known delis in Los Angeles. Suppose each must decide, without knowing the other's choice, whether to run a radio ad campaign. The table shows their weekly profits for each combination of choices.",
      "table": {
        "headers": [
          "",
          "Langer's advertises",
          "Langer's does not advertise"
        ],
        "rows": [
          [
            "Canter's advertises",
            "Canter's: $4,000; Langer's: $4,000",
            "Canter's: $7,000; Langer's: $2,000"
          ],
          [
            "Canter's does not advertise",
            "Canter's: $2,000; Langer's: $7,000",
            "Canter's: $5,000; Langer's: $5,000"
          ]
        ]
      },
      "ask": "Does Canter's have a dominant strategy?",
      "choices": [
        "Yes: advertising is its dominant strategy.",
        "Yes: not advertising is its dominant strategy.",
        "No: its best response is to copy Langer's choice.",
        "No: its best response is the opposite of Langer's choice."
      ],
      "correct_index": 0,
      "hints": [
        "A dominant strategy is an action that is a best response to every action of the other player. So find Canter's best response to each of Langer's two choices.",
        "Work one column at a time and read only Canter's profits. If Langer's advertises, Canter's compares $4,000 (advertise) with $2,000 (do not advertise).",
        "In the first column, Canter's best response is to advertise. Now compare $7,000 with $5,000 in the second column, and check whether the best response is the same action."
      ],
      "solution": [
        "Rule: a dominant strategy is an action that is a best response for every action of the other player.",
        "Apply it: if Langer's advertises, Canter's earns $4,000 by advertising and $2,000 by not advertising. If Langer's does not advertise, Canter's earns $7,000 by advertising and $5,000 by not advertising. Advertising is the best response both times, so it is Canter's dominant strategy.",
        "Common slips: not advertising is tempting because both delis earn $5,000 when neither advertises, but it is never Canter's best response; copying Langer's or doing the opposite would mean that the best response changes with Langer's choice, and here it does not.",
        "This is the reasoning behind the prisoner's dilemma from class, where snitching is a dominant strategy."
      ]
    },
    {
      "id": "m4-q02",
      "theme": "Checking a Nash Equilibrium in a Quantity Game",
      "source": "In-person lecture: Oligopoly (Cournot competition: simple case)",
      "kind": "numeric",
      "stem": "Suppose that on Sundays only two growers, Maya and Luis, sell cherries at the Brentwood Farmers Market. Each decides, without knowing the other's choice, whether to bring 15 or 20 crates, and more crates mean a lower price. The table shows their profits for the day.",
      "table": {
        "headers": [
          "",
          "Luis brings 15 crates",
          "Luis brings 20 crates"
        ],
        "rows": [
          [
            "Maya brings 15 crates",
            "Maya: $450; Luis: $450",
            "Maya: $375; Luis: $500"
          ],
          [
            "Maya brings 20 crates",
            "Maya: $500; Luis: $375",
            "Maya: $400; Luis: $400"
          ]
        ]
      },
      "ask": "Is the outcome in which both growers bring 20 crates a Nash equilibrium?",
      "choices": [
        "No: Maya earns more by switching alone to 15 crates.",
        "No: Luis earns more by switching alone to 15 crates.",
        "Yes: $400 is the highest profit a grower can earn in this table.",
        "Yes: neither grower earns more by switching alone to 15 crates."
      ],
      "correct_index": 3,
      "hints": [
        "A Nash equilibrium is a combination of actions such that no player wants to deviate. Check the growers one at a time, holding the other grower's choice fixed.",
        "Start in the cell where both bring 20 crates: Maya earns $400. If Luis still brings 20 crates and Maya switches to 15, read Maya's profit in the top-right cell.",
        "Maya would earn $375 instead of $400, so she does not want to switch. Now do the same check for Luis: compare his $400 with his profit if he alone brings 15 crates."
      ],
      "solution": [
        "Rule: a Nash equilibrium is a combination of actions such that no player wants to deviate, given what the other player does.",
        "Apply it: when both bring 20 crates, each earns $400. If Maya alone switches to 15 crates, she earns $375. If Luis alone switches to 15 crates, he earns $375. Neither gains by deviating, so this outcome is a Nash equilibrium.",
        "Common slip: $400 is not the highest profit in the table ($500 is), and it does not need to be. The only test is whether one player can do better by changing their own action.",
        "Class built the same kind of table in the simplified Cournot game: both firms would earn more at the low quantity ($450 each here), but each one is tempted to sell more, so they end up \"trapped\" at the high quantity."
      ]
    },
    {
      "id": "m4-q03",
      "theme": "Tacit vs. Explicit Collusion",
      "source": "In-person lecture: Oligopoly",
      "kind": "conceptual",
      "stem": "Suppose two neighboring shops rent beach cruiser bikes on the Venice Beach boardwalk, both at $20 an hour. One Monday the first shop raises its price to $25, although its costs have not changed, and a few days later the second shop does the same. The two owners have never communicated about prices.",
      "ask": "Which term from class describes this behavior?",
      "choices": [
        "A price war",
        "Bertrand competition",
        "Tacit collusion",
        "Explicit collusion"
      ],
      "correct_index": 2,
      "hints": [
        "Class described collusion as competitors that \"cooperate\" instead of competing, and named two types. First decide whether these two shops are competing on price or \"cooperating.\"",
        "The second shop followed the price increase instead of undercutting it, so the shops are \"cooperating.\" What separates the two types of collusion is whether the firms communicate.",
        "The owners never communicated. Look for the type of collusion that needs no communication."
      ],
      "solution": [
        "Rule: in tacit collusion, competitors \"cooperate\" without communicating. In explicit collusion, firms communicate, for example to fix prices.",
        "Apply it: the second shop matched the higher price instead of undercutting it, and the owners never communicated. That is tacit collusion, which class noted is not necessarily illegal.",
        "The other options: explicit collusion requires the firms to communicate, and it is illegal per se; a price war is the opposite, with firms cutting prices; in Bertrand competition the firms keep undercutting each other.",
        "The price-fixing case from class is the example of explicit collusion: there, the competitors met to set prices."
      ]
    },
    {
      "id": "m4-q04",
      "theme": "Naming a Market Structure from Its Features",
      "source": "In-person lecture: Market structures (study-team discussion)",
      "kind": "conceptual",
      "stem": "Koreatown, just west of downtown Los Angeles, is known for its karaoke lounges with private rooms. Suppose more than a dozen karaoke lounges compete there, each one is a little different from its rivals, and nothing stops a new one from opening.",
      "ask": "Which of the four market structures from class fits this market best?",
      "choices": [
        "Perfect competition",
        "Monopolistic competition",
        "Oligopoly",
        "Monopoly"
      ],
      "correct_index": 1,
      "hints": [
        "Use the questions from the study-team discussion in class: What is the number of competitors? Is the product differentiated? Are there barriers to entry?",
        "Here the number of competitors is high, the product is a little differentiated, and there are no barriers to entry. Start by ruling out the two market structures that have barriers to entry.",
        "Oligopoly and monopoly have barriers to entry, so two structures are left. In one of them, all sellers offer an identical product. In the other, the products differ a little."
      ],
      "solution": [
        "Rule: class describes each market structure by the number of competitors, the product differentiation and the barriers to entry. Monopolistic competition has a high number of competitors, low product differentiation and no barriers to entry.",
        "Apply it: there are many karaoke lounges, each one a little different from its rivals, and new ones can open freely. That is monopolistic competition.",
        "The other options: in perfect competition there is no product differentiation at all; an oligopoly has only a handful of competitors and has barriers to entry; a monopoly has one seller and has barriers to entry.",
        "These are the same features as in the table of market structure characteristics shown in the videos."
      ]
    },
    {
      "id": "m4-q05",
      "theme": "A Price Taker's Profit-Maximizing Quantity",
      "source": "In-person lecture: Market structures (warm-up exercise)",
      "kind": "numeric",
      "stem": "Suppose Elena sells boxes of red roses at the Original Los Angeles Flower Market, the wholesale flower market in downtown Los Angeles. Many other sellers offer identical roses, so she is a price taker: she can sell as many boxes as she wants at the market price of $44 per box. Her marginal cost is MC = 4 + 2Q dollars, where Q is the number of boxes she sells per day.",
      "ask": "How many boxes per day should she sell to maximize her profit?",
      "choices": [
        "18 boxes",
        "20 boxes",
        "22 boxes",
        "40 boxes"
      ],
      "correct_index": 1,
      "hints": [
        "Profit is maximized where marginal revenue equals marginal cost (MR = MC). For a price taker, marginal revenue is equal to the market price.",
        "So set the market price equal to the marginal cost: 44 = 4 + 2Q.",
        "Subtract 4 from both sides to get 40 = 2Q. One more step gives Q."
      ],
      "solution": [
        "Rule: a firm maximizes profit where MR = MC. A price taker's marginal revenue is the market price, so the rule becomes P = MC.",
        "Apply it: 44 = 4 + 2Q, so 2Q = 40 and Q = 20 boxes per day.",
        "Common slips: 22 divides 44 by 2 and forgets the 4; 18 divides 44 by 2 and only then subtracts the 4; 40 subtracts the 4 but forgets to divide by 2.",
        "This is the same P = MC step as for the soybean farmer in the warm-up exercise from class."
      ]
    },
    {
      "id": "m4-q06",
      "theme": "Operate or Shut Down in the Short Run",
      "source": "Async videos: Perfect Competition in the Short-Run; Monopoly",
      "kind": "numeric",
      "stem": "Pacific Park is the seaside amusement park just west of Los Angeles, known for its Ferris wheel on a pier over the ocean. Suppose that on winter weekdays it can sell ride wristbands for $30 each. At its profit-maximizing quantity, its average variable cost is $20 per wristband and its average total cost is $45 per wristband. Its fixed costs are already paid and sunk.",
      "ask": "In the short run, what should Pacific Park do on winter weekdays?",
      "choices": [
        "Shut down, because the price is below average variable cost.",
        "Shut down, because the price is below average total cost.",
        "Operate, because the price is above average total cost.",
        "Operate, because the price is above average variable cost."
      ],
      "correct_index": 3,
      "hints": [
        "This is the short-run decision to operate or to shut down. The fixed costs are sunk: they are paid either way, so they are not relevant for this decision.",
        "The rule from the videos: operate if the price is at least the average variable cost, and shut down if the price is below it. Find those two numbers in the question.",
        "The price is $30 and the average variable cost is $20. Decide whether the price is above or below the average variable cost, and what the rule then says."
      ],
      "solution": [
        "Rule: in the short run, with fixed costs sunk, a firm should operate as long as the price is at least the average variable cost (P ≥ AVC). The fixed costs are paid whether it operates or shuts down, so they do not affect the decision.",
        "Apply it: the price of $30 is above the average variable cost of $20, so Pacific Park should operate.",
        "Common slip: the price is below the average total cost of $45, so in this example the park loses money on winter weekdays. But average total cost is the wrong comparison here: if the park shut down, it would still have to pay its fixed costs and would lose even more.",
        "This is the loss case in the Perfect Competition in the Short-Run video: if you operate you still lose money, but not as much as if you shut down."
      ]
    },
    {
      "id": "m4-q07",
      "theme": "A Tariff as a Per-Unit Tax: What Buyers Bear",
      "source": "In-person lecture: Taxation (per-unit taxes and tariffs)",
      "kind": "numeric",
      "stem": "The Port of Los Angeles, in San Pedro, is one of the busiest container ports in the United States. Suppose a tariff of $40 is charged on every imported bicycle unloaded there. Before the tariff, a bicycle sold for $200. With the tariff, buyers pay $230 per bicycle, and sellers keep $190 after the tariff is paid.",
      "ask": "How much of the $40 tariff do buyers bear per bicycle?",
      "choices": [
        "$10",
        "$20",
        "$30",
        "$40"
      ],
      "correct_index": 2,
      "hints": [
        "Class treats a tariff as a per-unit tax. The part of a tax that buyers bear is how much more they pay than they did before the tax.",
        "Buyers paid $200 before the tariff and pay $230 with it. Compare these two prices.",
        "Compute $230 − $200. As a check, sellers keep $200 − $190 less than before, and the two parts must add up to the $40 tariff."
      ],
      "solution": [
        "Rule: with a per-unit tax, the price paid by the buyer rises, the price paid to the seller drops, and the gap between the two is the tax. Each side bears the change in its own price. Class treats a tariff as a special case of a tax.",
        "Apply it: buyers pay $230 − $200 = $30 more per bicycle. Sellers keep $200 − $190 = $10 less. Together, $30 + $10 = $40, the tariff.",
        "Common slips: $10 is the part that sellers bear; $20 assumes that a tax is always split in half; $40 assumes that buyers bear all of it, but the price they pay rose by less than the tariff.",
        "This is the per-unit tax diagram from class, where the price paid by the buyer equals the price paid to the seller plus the tax."
      ]
    },
    {
      "id": "m4-q08",
      "theme": "Tax Remittance: Who Sends the Check",
      "source": "In-person lecture: Taxation (tax remittance)",
      "kind": "conceptual",
      "stem": "Hotels in the City of Los Angeles collect a hotel tax from their guests and send it to the city. To keep things simple, suppose the tax is $15 per room per night. Now suppose the city changed the rule so that guests, not hotels, had to send the $15 to the city.",
      "ask": "In the simple model from class, how would this change the share of the tax that guests bear?",
      "choices": [
        "Guests would bear all of the tax.",
        "Guests would bear a larger share than before.",
        "Guests would bear the same share as before.",
        "Guests would bear a smaller share than before."
      ],
      "correct_index": 2,
      "hints": [
        "Class called this tax remittance: which group, consumers or producers, must send the check to the government.",
        "Class separated tax remittance from tax incidence, which is the group that ultimately bears the burden of the tax. Ask whether changing the first one changes the second one.",
        "Either way there is a $15 gap between what a guest pays in total and what the hotel keeps. Ask whether the supply of rooms or the demand for rooms depends on who sends the check."
      ],
      "solution": [
        "Rule: tax remittance is about which group sends the check to the government. In the simple model from class, it does not matter who sends the check: the split of the burden is the same.",
        "Apply it: whether hotels or guests send the $15, there is a $15 gap between what a guest pays in total and what the hotel keeps, and supply and demand are the same. Guests bear the same share as before.",
        "Common slip: sending the check is not the same as bearing the tax. Guests would not bear all of it, or more of it, just because they are the ones who send it.",
        "Class added that in practice remittance matters a lot for enforcement: it is easier to collect taxes from firms than from individuals."
      ]
    },
    {
      "id": "m4-q09",
      "theme": "The Minimum Wage in the Textbook Model",
      "source": "In-person lecture: The minimum wage (supply and demand for labor)",
      "kind": "conceptual",
      "stem": "West Hollywood sets its own minimum wage, above California's. Suppose that without a minimum wage, restaurant dishwashers there would earn $18 an hour, the wage at which labor supply equals labor demand. Suppose the city's minimum wage is $20 an hour.",
      "ask": "In the textbook model from class, what does this minimum wage create in the market for dishwashers?",
      "choices": [
        "A labor surplus: more workers want jobs than firms want to hire.",
        "Excess demand for labor: firms want to hire more workers than want jobs.",
        "No change: the wage and employment stay at the market level.",
        "More employment: firms hire more workers at the higher wage."
      ],
      "correct_index": 0,
      "hints": [
        "A minimum wage is a price floor in the labor market: the wage cannot go below it. Use the diagram from class with labor supply and labor demand.",
        "The $20 minimum is above the $18 market wage. Ask what a higher wage does to the number of people who want to work, and to the number of workers that firms want to hire.",
        "At $20, more people want to work than at $18, and firms want to hire fewer workers than at $18. Name the gap between these two numbers."
      ],
      "solution": [
        "Rule: in the textbook model, a minimum wage above the market wage is a binding price floor. At the higher wage, more workers want to work but firms demand fewer workers. The gap between the two is a labor surplus (unemployment).",
        "Apply it: at $20 instead of $18, more people want to work as dishwashers, and restaurants want to hire fewer of them. More workers want jobs than firms want to hire: a labor surplus.",
        "Common slips: excess demand for labor (firms wanting to hire more workers than want jobs) is what a wage below the market wage would create, not one above it; the minimum wage does change the outcome, because $20 is above $18; and at a higher wage firms hire fewer workers, not more.",
        "This is the minimum-wage diagram from class. Class added that how much employment actually falls is an empirical question."
      ]
    }
  ]
})
