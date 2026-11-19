registerModule({
  "id": "m3",
  "title": "Module 3",
  "subtitle": "Segment pricing, versioning, flat fees and two-part tariffs, auctions, average costs, economies of scale",
  "questions": [
    {
      "id": "m3-q01",
      "theme": "Segment Pricing: What the Seller Needs",
      "source": "In-person lecture: Complex pricing (FIFA 22 example); async video: Segment Pricing",
      "kind": "conceptual",
      "stem": "Madame Tussauds Hollywood is a wax museum on Hollywood Boulevard. Suppose it charges California residents $22 and everyone else $30 for the same ticket.",
      "ask": "What must the museum be able to do for this segment pricing to work?",
      "choices": [
        "Know the exact willingness to pay of every single visitor.",
        "Have a lower cost of serving California residents than other visitors.",
        "Tell California residents apart from other visitors, for example by ID.",
        "Offer two versions of the ticket and let visitors choose."
      ],
      "correct_index": 2,
      "hints": [
        "This is segment pricing (third-degree price discrimination): the seller divides its customers into groups and charges each group a different price for the same product.",
        "Each group has its own price, so the museum has to decide which price each visitor pays. Think about what stops every visitor from asking for the $22 price.",
        "In the video's examples of segment pricing, the seller could easily check which group a customer belongs to. Look for the option that lets the museum do that."
      ],
      "solution": [
        "Rule: segment pricing means dividing customers into groups and charging each group its own price. It only works if the seller can tell which group each customer belongs to.",
        "Apply it: if the museum could not check who is a California resident, every visitor would ask for the $22 price and nobody would pay $30. Asking for a California ID solves this.",
        "The other options: knowing every visitor's exact willingness to pay is what first-degree price discrimination needs; both groups buy the same ticket, so no cost difference is needed; two versions that visitors choose between is versioning.",
        "Class showed segment pricing with FIFA 22, which sells at different prices in different countries. The video's example is a theme park in Mexico that charges Mexican citizens less: citizenship is easy to verify with an ID."
      ]
    },
    {
      "id": "m3-q02",
      "theme": "Versioning",
      "source": "In-person lecture: Complex pricing (FIFA 22 example)",
      "kind": "conceptual",
      "stem": "Six Flags Magic Mountain is a roller-coaster park in Valencia, north of Los Angeles. Suppose it sells a regular one-day ticket for $70 and, for $150, a one-day ticket that also lets you skip the regular lines. Any visitor can buy either ticket.",
      "ask": "Which pricing strategy is this?",
      "choices": [
        "Segment pricing (third-degree price discrimination)",
        "First-degree price discrimination (perfect price discrimination)",
        "A two-part tariff (a fixed fee plus a usage fee)",
        "Versioning (second-degree price discrimination)"
      ],
      "correct_index": 3,
      "hints": [
        "The videos describe several forms of complex pricing. To tell them apart, ask who decides which price a customer pays: the seller or the customer.",
        "Under segment pricing, the seller decides which group each customer belongs to, and each group gets its own price. Here nobody is sorted: any visitor can buy either ticket.",
        "The park sells a basic and a premium form of the same day at the park, at two prices, and lets customers choose. Recall the name the video gives to this strategy."
      ],
      "solution": [
        "Rule: versioning (second-degree price discrimination) means offering slightly different versions of a product: a basic version at a lower price and a premium version at a higher price. Anyone can buy the version they want.",
        "Apply it: the regular ticket is the basic version and the skip-the-line ticket is the premium version. Visitors choose for themselves.",
        "The other options: segment pricing needs the park to tell groups apart and give each group its own price; first-degree price discrimination charges each customer exactly her willingness to pay; a two-part tariff is a fixed fee plus a usage fee for each unit.",
        "This is the FIFA 22 example from class: a Standard Edition and a more expensive Ultimate Edition, and every buyer can choose either one."
      ]
    },
    {
      "id": "m3-q03",
      "theme": "Flat Fee: How Much the Customer Uses",
      "source": "Async video: Volume Pricing: Flat Fee",
      "kind": "numeric",
      "stem": "Gold's Gym in Venice is one of the best-known gyms in Los Angeles. Suppose one member's monthly demand is P = 30 − 3Q, where Q is her number of visits and P is her willingness to pay for one more visit, in dollars. At $12 per visit, she makes 6 visits a month. Suppose the gym instead sells her unlimited visits for a flat monthly fee, and she buys it.",
      "ask": "How many visits a month does she make under the flat fee?",
      "choices": [
        "6 visits",
        "10 visits",
        "27 visits",
        "30 visits"
      ],
      "correct_index": 1,
      "hints": [
        "This is volume pricing with a flat fee. Once the fee is paid, one more visit costs her nothing extra.",
        "She keeps going as long as one more visit is worth something to her, so she stops when her willingness to pay for one more visit reaches $0. Set P = 0 in her demand curve.",
        "0 = 30 − 3Q, so 3Q = 30. Solve for Q."
      ],
      "solution": [
        "Rule: under a flat fee, one more unit costs the customer nothing, so she keeps using the service until one more unit is worth $0 to her.",
        "Apply it: set P = 0 in her demand curve: 0 = 30 − 3Q, so Q = 10 visits a month. At $12 per visit she stopped at 6 visits. Under the flat fee she also makes the visits that are worth less than $12 to her.",
        "Common slips: 6 visits keeps the old price of $12 per visit, but under the flat fee one more visit is free to her; 27 subtracts 3 from 30 instead of dividing 30 by 3; 30 is the $30 where her demand curve starts, not a number of visits.",
        "This is the flat-fee example from the video with new numbers."
      ]
    },
    {
      "id": "m3-q04",
      "theme": "Flat Fee When Each Unit Has a Cost",
      "source": "In-person lecture: Complex pricing (airline flat-fee warm-up)",
      "kind": "conceptual",
      "stem": "In-N-Out Burger was founded in Baldwin Park, east of Los Angeles. Suppose it considers a burger pass: unlimited burgers for a flat monthly fee with no charge per burger, even though each burger costs $2 to make. As class showed for flat fees, pass holders would then eat too many burgers.",
      "ask": "Which change to the pass fixes this problem?",
      "choices": [
        "Add a usage fee per burger to the flat monthly fee.",
        "Raise the flat monthly fee.",
        "Replace the flat monthly fee with a flat yearly fee.",
        "Give new customers a lower flat monthly fee."
      ],
      "correct_index": 0,
      "hints": [
        "This is volume pricing. Compare what one more burger costs the pass holder with what it costs In-N-Out to make.",
        "With the pass, one more burger costs the customer $0 but costs In-N-Out $2. So pass holders eat burgers that are worth less than $2 to them. The size of the flat fee does not change this.",
        "To stop the overuse, the customer must pay something each time she takes one more burger. Recall the pricing scheme from class that combines a fixed fee with a second fee."
      ],
      "solution": [
        "Rule: when each unit has a cost, a flat fee leads to too much use. The fix from class is a usage fee. A fixed fee plus a usage fee is called a two-part tariff.",
        "Apply it: with the pass, an extra burger is free to the customer, so she eats burgers that are worth less to her than the $2 they cost to make. A usage fee per burger makes her stop once one more burger is worth less to her than the fee.",
        "The other options only change the size or timing of the flat fee, or who pays it. An extra burger would still be free to the pass holder, so the overuse would continue.",
        "This is the airline warm-up from class: with a flat fee you fly too much, so you need a usage fee. The video tells the same story with MoviePass."
      ]
    },
    {
      "id": "m3-q05",
      "theme": "Private Values vs. Common Values",
      "source": "In-person lecture: Auctions (private vs. common values)",
      "kind": "conceptual",
      "stem": "Walt Disney Concert Hall in downtown Los Angeles is the home of the LA Phil. Suppose a fundraising gala there auctions the chance to conduct the orchestra for one piece. Each bidder is a music lover who knows what the experience is worth to her, and these amounts differ from bidder to bidder.",
      "ask": "Which description fits this auction?",
      "choices": [
        "Common values: each bidder has her own value for the prize.",
        "Private values: the prize has one true value that nobody knows yet.",
        "Common values: the prize has one true value that nobody knows yet.",
        "Private values: each bidder has her own value for the prize."
      ],
      "correct_index": 3,
      "hints": [
        "Class separated auctions by what the item is worth to the bidders: private values versus common values.",
        "With private values, buyers differ in how much they value the item, like art lovers with different tastes for the same painting. With common values, the item is worth the same to everyone, but nobody knows that value yet, like an oil field.",
        "Here each bidder knows what conducting the orchestra is worth to her, and the amounts differ across bidders. Decide which of the two cases that is, and match it with its name."
      ],
      "solution": [
        "Rule: private values means buyers differ in how much they value the good. Common values means buyers would agree on the good's value, but they do not know it.",
        "Apply it: each bidder knows what conducting the LA Phil is worth to her, and the amounts differ from bidder to bidder. That is a private-value auction.",
        "The other options: the prize has no single true value that everyone is unsure about, so \"one true value that nobody knows yet\" does not fit; and \"each bidder has her own value\" is what private values means, not common values.",
        "Class used an art auction for private values (art lovers may have different tastes for the same painting) and an oil field auction for common values."
      ]
    },
    {
      "id": "m3-q06",
      "theme": "Second-Price Auction: The Winner's Surplus",
      "source": "In-person lecture: Auctions (second-price sealed-bid auction)",
      "kind": "numeric",
      "stem": "Suppose the Los Angeles Zoo, in Griffith Park, raises money by selling a private behind-the-scenes tour in a second-price sealed-bid auction. Four people submit sealed bids of $150, $240, $310 and $400. The tour is worth $400 to the highest bidder.",
      "ask": "What is the winner's consumer surplus?",
      "choices": [
        "$0",
        "$90",
        "$310",
        "$400"
      ],
      "correct_index": 1,
      "hints": [
        "In a second-price sealed-bid auction, the highest bidder wins but pays the second-highest bid. The winner's consumer surplus is what the item is worth to her minus the price she pays.",
        "Put the four bids in order. The highest bid decides who wins, and the next bid down is the price she pays.",
        "The winner bid $400, and the second-highest bid is $310. Subtract that price from the $400 the tour is worth to her."
      ],
      "solution": [
        "Rule: in a second-price sealed-bid auction, the highest bidder wins and pays the second-highest bid. The winner's consumer surplus is her valuation minus the price.",
        "Apply it: the $400 bid is the highest, so that bidder wins. The second-highest bid is $310, so she pays $310. Her consumer surplus is $400 − $310 = $90.",
        "Common slips: $0 has her pay her own bid of $400, but in this auction the winner pays the second-highest bid; $310 is the price she pays, not her surplus; $400 is what the tour is worth to her, before the price is subtracted.",
        "Class used the same notation for auctions: the winner's consumer surplus is her valuation minus the final price, and a bidder who does not win gets 0."
      ]
    },
    {
      "id": "m3-q07",
      "theme": "The Winner's Curse",
      "source": "In-person lecture: Auctions (the winner's curse)",
      "kind": "conceptual",
      "stem": "The Kia Forum in Inglewood is a well-known concert arena. Suppose the right to keep one concert night's parking revenue from a lot across the street is sold in a sealed-bid auction: the highest bidder wins and pays her bid. The revenue will be the same whoever wins, but nobody knows it yet, so each bidder makes her own estimate.",
      "ask": "According to the winner's curse, who is most likely to win this auction?",
      "choices": [
        "The bidder whose estimate is closest to the true revenue.",
        "The bidder who overestimated the revenue the most.",
        "The bidder who underestimated the revenue the most.",
        "The bidder for whom the parking revenue is worth the most."
      ],
      "correct_index": 1,
      "hints": [
        "This is a common-value auction: the prize is worth the same to every bidder, but each bidder only has an estimate. The winner's curse is about whose estimate ends up winning.",
        "Bidders with higher estimates place higher bids, and the highest bid wins. Among the estimates, some will be too low and some will be too high.",
        "The estimates may be about right on average. Ask which single estimate leads to the highest bid."
      ],
      "solution": [
        "Rule: in a common-value auction, the winner tends to be the bidder with the most optimistic estimate. That is the winner's curse.",
        "Apply it: the estimates may be about right on average, but some are too high. The bidder who overestimated the most places the highest bid and wins, and she is likely to pay more than the parking revenue turns out to be.",
        "The other options: an accurate or a low estimate leads to a lower bid, which loses; and the revenue is the same whoever wins, so it is not worth more to one bidder than to another.",
        "This is the guessing exercise from class: the guesses were not bad on average, but the person who overestimated the most won the auction and lost money by winning."
      ]
    },
    {
      "id": "m3-q08",
      "theme": "Average Fixed Cost",
      "source": "In-person lecture: The Cost Function",
      "kind": "numeric",
      "stem": "Philippe the Original, near Union Station in downtown Los Angeles, is famous for its French dip sandwiches. Suppose its fixed cost is $1,800 per day, however many sandwiches it makes. On a day when it makes 300 sandwiches, its average fixed cost is $6 per sandwich.",
      "ask": "What is its average fixed cost per sandwich on a day when it makes 600 sandwiches?",
      "choices": [
        "$3",
        "$6",
        "$12",
        "$1,800"
      ],
      "correct_index": 0,
      "hints": [
        "Average fixed cost is the fixed cost divided by the quantity produced.",
        "The fixed cost is $1,800 on both days. Only the number of sandwiches it is divided by changes.",
        "Divide $1,800 by the 600 sandwiches."
      ],
      "solution": [
        "Rule: average fixed cost = fixed cost ÷ quantity. The fixed cost does not change with output, so the average fixed cost falls as output rises.",
        "Apply it: $1,800 ÷ 600 = $3 per sandwich. The same $1,800 is spread over twice as many sandwiches, so the average fixed cost is cut in half, from $6 to $3.",
        "Common slips: $6 is the average fixed cost of the 300-sandwich day (the total fixed cost stays the same, not the cost per sandwich); $12 doubles the average fixed cost instead of halving it; $1,800 is the total fixed cost, not yet divided by the quantity.",
        "Class did the same with its cost-function example: the average fixed cost is the fixed cost divided by the quantity, and it falls as the quantity rises."
      ]
    },
    {
      "id": "m3-q09",
      "theme": "Economies of Scale",
      "source": "In-person lecture: The Cost Function (average cost and output)",
      "kind": "numeric",
      "stem": "Huy Fong Foods makes its Sriracha hot sauce in Irwindale, in the San Gabriel Valley. Suppose its total cost is $30,000 on a day when it makes 5,000 bottles and $50,000 on a day when it makes 10,000 bottles.",
      "ask": "Which term from class describes its costs between these two output levels?",
      "choices": [
        "Economies of scale",
        "Diseconomies of scale",
        "Constant economies of scale",
        "Economies of scope"
      ],
      "correct_index": 0,
      "hints": [
        "The terms from class are about what happens to average cost as output increases. Average cost = total cost ÷ quantity.",
        "Compute the average cost per bottle at each output level: $30,000 ÷ 5,000 and $50,000 ÷ 10,000.",
        "Average cost is $6 per bottle at the lower output and $5 per bottle at the higher output. Recall the name for average cost that falls with output (\"cheaper by the dozen\")."
      ],
      "solution": [
        "Rule: economies of scale means average cost falls as output increases. Constant economies of scale means average cost stays the same, and diseconomies of scale means average cost rises.",
        "Apply it: average cost is $30,000 ÷ 5,000 = $6 per bottle at the lower output and $50,000 ÷ 10,000 = $5 per bottle at the higher output. Average cost falls with output, so these are economies of scale.",
        "Common slips: \"diseconomies of scale\" looks at total cost, which rises whenever more bottles are made, but the test is average cost; \"constant economies of scale\" would need the same average cost at both output levels; economies of scope is about one firm making several related products, not more of the same product.",
        "Class showed economies of scale with the Tesla Model 3: the cost per unit falls as weekly production rises."
      ]
    }
  ]
})
