registerModule({
  "id": "m1",
  "title": "Module 1",
  "subtitle": "Firm value, marginal thinking, demand and consumer surplus, supply and demand shifts, pricing, gender pay gap",
  "questions": [
    {
      "id": "m1-q01",
      "theme": "Firm Value vs. Market Share",
      "source": "In-person lecture: What makes a firm valuable? (Ford example)",
      "kind": "conceptual",
      "stem": "Suppose the new CEO of a Hollywood studio announces that the top priority of its streaming service is to overtake Netflix in subscribers, \"whatever it takes.\" The studio's stock price falls sharply the same day.",
      "ask": "Investors reacted this way because a firm's value is given by which of these?",
      "choices": [
        "The profit it reports this quarter",
        "The stream of profits it earns over time",
        "The number of subscribers it signs up",
        "The revenue it collects this year"
      ],
      "correct_index": 1,
      "hints": [
        "Use the class definition of the value of a firm. It is not about how big the firm is.",
        "The definition has two ingredients: revenue minus cost, and many years (not only the current one).",
        "Overtaking Netflix \"whatever it takes\" means price cuts and heavy spending for years. Ask what that does to revenue minus cost in those years."
      ],
      "solution": [
        "Rule from class: the value of a firm is the present discounted value of its future net profits. In short, its stream of profits.",
        "Apply it: overtaking Netflix \"whatever it takes\" means price cuts and heavy spending, which can lower profits for years. Investors expect a smaller stream of profits, so the stock price falls. This is the Ford example from class: the stock fell when the CEO announced the goal of a bigger market share than GM.",
        "The other options: one quarter's profit is only one piece of the stream (Amazon and Uber lost money for years and were still worth billions). Subscribers matter only if they bring profits. Revenue leaves out costs."
      ]
    },
    {
      "id": "m1-q02",
      "theme": "Marginal Cost vs. Cost per Unit",
      "source": "In-person lecture: Thinking at the margin (workout-session exercise)",
      "kind": "numeric",
      "stem": "Barry's, the fitness chain that started in West Hollywood, runs group classes in its studios. Suppose the total daily cost of running 3 classes at one studio is $750, and the total daily cost of running 4 classes is $920.",
      "ask": "What is the marginal cost of the fourth class?",
      "choices": [
        "$170",
        "$230",
        "$250",
        "$920"
      ],
      "correct_index": 0,
      "hints": [
        "Marginal cost is the extra cost of one more unit. Here: the cost added by the fourth class.",
        "Compare the two totals in the question. No division is needed.",
        "Marginal cost of the 4th class = total cost of 4 classes − total cost of 3 classes."
      ],
      "solution": [
        "Rule: marginal cost = the change in total cost from one more unit.",
        "Marginal cost of the 4th class = $920 − $750 = $170.",
        "$230 is the cost per class when four classes run ($920 ÷ 4) and $250 is the cost per class when three run ($750 ÷ 3). Dividing like this is the accountant's instinct from the workout exercise in class. $920 is the total cost of four classes, not the extra cost of the fourth."
      ]
    },
    {
      "id": "m1-q03",
      "theme": "Principle of Maximum Net Advantage",
      "source": "In-person lecture: Principle of Maximum Net Advantage (coffee-shop example)",
      "kind": "numeric",
      "stem": "Suppose Leo's Tacos Truck, the Los Angeles al pastor favorite, is deciding how many trucks to send to a weekend festival at the Rose Bowl. For each additional truck it estimates the extra revenue (marginal benefit) and the extra cost (marginal cost).",
      "table": {
        "headers": [
          "Truck",
          "Marginal benefit",
          "Marginal cost"
        ],
        "rows": [
          [
            "1st",
            "$900",
            "$400"
          ],
          [
            "2nd",
            "$700",
            "$500"
          ],
          [
            "3rd",
            "$600",
            "$550"
          ],
          [
            "4th",
            "$400",
            "$650"
          ]
        ]
      },
      "ask": "How many trucks should Leo's send to maximize its net benefit?",
      "choices": [
        "1 truck",
        "2 trucks",
        "3 trucks",
        "4 trucks"
      ],
      "correct_index": 2,
      "hints": [
        "Use the principle of maximum net advantage: keep adding trucks as long as the marginal benefit of the next truck exceeds its marginal cost.",
        "Go down the table one truck at a time and compare the two columns. The 1st truck brings in $900 and costs $400, so send it.",
        "The 3rd truck still brings in more than it costs ($600 against $550). Now compare the two numbers for the 4th truck."
      ],
      "solution": [
        "Rule: keep going while marginal benefit exceeds marginal cost. The class slide says to stop where the two are equal. In this table they are never exactly equal, so stop at the last truck whose marginal benefit is still above its marginal cost.",
        "Trucks 1, 2 and 3 each bring in more than they cost: +$500, +$200 and +$50. The 4th truck would bring in $400 and cost $650, so it would lower net benefit by $250. Send 3 trucks.",
        "Stopping at 1 or 2 trucks gives up gains that are still positive: even +$50 is worth taking. Sending 4 adds a truck that costs more than it brings in.",
        "This is the coffee-shop example from class: keep opening stores until the next one no longer pays for itself."
      ]
    },
    {
      "id": "m1-q04",
      "theme": "Consumer Surplus (discrete)",
      "source": "Async videos: The Law of Demand; Consumer Surplus",
      "kind": "numeric",
      "stem": "Four friends each want at most one ticket to a Dodgers game. Their maximum willingness to pay is: Ana $80, Ben $65, Chloe $50 and Dev $35. Suppose a ticket costs $50.",
      "ask": "What is the total consumer surplus of the four friends?",
      "choices": [
        "$30",
        "$45",
        "$150",
        "$195"
      ],
      "correct_index": 1,
      "hints": [
        "Consumer surplus is willingness to pay minus the price, added up over the people who buy.",
        "First find who buys: a person buys if their willingness to pay is at least $50. Someone who does not buy has a surplus of zero.",
        "Ana: $80 − $50 = $30. Ben: $65 − $50 = $15. Chloe: $50 − $50 = $0. Dev does not buy. Add these up."
      ],
      "solution": [
        "Rule: each buyer's consumer surplus = willingness to pay − price. People who do not buy get zero.",
        "At $50, Ana, Ben and Chloe buy. Dev ($35) does not. Consumer surplus = $30 + $15 + $0 = $45.",
        "$30 subtracts $15 for Dev, but he simply does not buy. $150 is the seller's revenue ($50 × 3 tickets). $195 is the three buyers' total willingness to pay, before subtracting the price.",
        "This is the pizza example from the videos: consumer surplus is the area between the demand staircase and the price."
      ],
      "figure": {
        "kind": "staircase",
        "wtp": [
          80,
          65,
          50,
          35
        ],
        "names": [
          "Ana",
          "Ben",
          "Chloe",
          "Dev"
        ],
        "price": 50,
        "xlabel": "Tickets",
        "ylabel": "Price ($)",
        "areas": {
          "cs": "Consumer surplus = $45",
          "revenue": "Revenue = $150"
        }
      }
    },
    {
      "id": "m1-q05",
      "theme": "Change in Demand vs. Change in Quantity Demanded",
      "source": "Async video: Factors Affecting Demand",
      "kind": "conceptual",
      "stem": "Porto's Bakery, the Cuban bakery with stores from Glendale to Downey, is famous for its potato balls. Consider four events, each happening on its own.",
      "ask": "Which event shifts the demand curve for Porto's potato balls?",
      "choices": [
        "Porto's cuts the price of a potato ball.",
        "Porto's raises the price of a potato ball.",
        "Porto's finds a cheaper potato supplier.",
        "Porto's gets a rave review from an influencer."
      ],
      "correct_index": 3,
      "hints": [
        "Use the distinction from the video: a change in demand shifts the whole curve, while a change in quantity demanded is a movement along it.",
        "A change in the product's own price moves you along the demand curve. It does not shift the curve.",
        "A cheaper input changes what the seller is willing to supply, which is the supply curve. Look for the event that makes buyers want more at any given price."
      ],
      "solution": [
        "Rule: the demand curve shifts when buyers want more (or less) at every price. A change in the product's own price is only a movement along the curve.",
        "The rave review makes more people want potato balls at any given price, so demand shifts to the right. It works like the celebrity endorsement in the video.",
        "The price cut and the price rise are movements along the same demand curve: price is the one P of the 4 Ps that does not shift demand. The cheaper supplier shifts the supply curve, not the demand curve."
      ]
    },
    {
      "id": "m1-q06",
      "theme": "Comparative Statics: Inferring a Shift from Data",
      "source": "In-person lecture: Supply and demand (copper and software-developer examples)",
      "kind": "conceptual",
      "stem": "Suppose that over the past year the price of surfboards at Malibu surf shops fell, and the number of surfboards sold fell too. Assume that only one of the two curves shifted.",
      "ask": "Which shift fits both facts?",
      "choices": [
        "The demand curve shifted to the left.",
        "The demand curve shifted to the right.",
        "The supply curve shifted to the left.",
        "The supply curve shifted to the right."
      ],
      "correct_index": 0,
      "hints": [
        "Use the supply-and-demand diagram: shift one curve at a time and see where the new equilibrium lands.",
        "From the videos: when demand shifts right, price and quantity both rise. When supply shifts right, price falls and quantity rises.",
        "A shift to the left does the opposite of a shift to the right. Which leftward shift makes price and quantity both fall?"
      ],
      "solution": [
        "Test each shift against the two facts: price down, quantity down.",
        "Demand shifts left: buyers want fewer surfboards at every price, so price and quantity both fall. This fits. It is the diagram from class for junior software developers: AI shifted employers' demand to the left, so the equilibrium price and the equilibrium quantity (employment) both fell.",
        "Demand shifts right: price and quantity both rise. Supply shifts left: quantity falls, but price rises. Supply shifts right: price falls, but quantity rises."
      ],
      "figure": {
        "kind": "sd",
        "xlabel": "Surfboards sold",
        "ylabel": "Price",
        "panels": [
          {
            "caption": "Demand shifts left; supply unchanged",
            "demand": {
              "shift": "left",
              "size": "large"
            },
            "supply": {
              "shift": "none"
            },
            "result": "Price falls, quantity falls"
          }
        ]
      }
    },
    {
      "id": "m1-q07",
      "theme": "Fixed Supply",
      "source": "In-person lecture: Supply and demand (Bitcoin)",
      "kind": "conceptual",
      "stem": "Suppose a sneaker brand made exactly 10,000 pairs of a limited-edition shoe and will never make more. Collectors trade the pairs at resale shops on Fairfax Avenue in Los Angeles. Then a Lakers star is photographed wearing the shoe, and many more people want a pair.",
      "ask": "What happens to the resale price and to the total number of pairs?",
      "choices": [
        "Price stays the same; number of pairs stays the same.",
        "Price stays the same; number of pairs rises.",
        "Price rises; number of pairs rises.",
        "Price rises; number of pairs stays the same."
      ],
      "correct_index": 3,
      "hints": [
        "Use a supply-and-demand diagram. Start with the supply curve: there are 10,000 pairs whatever the price.",
        "A quantity that is the same at every price gives a vertical supply curve. The photo shifts the demand curve to the right.",
        "Slide the demand curve to the right along the vertical supply curve. Which way does the crossing point move?"
      ],
      "solution": [
        "Rule: when supply is fixed, the supply curve is vertical, so a change in demand can only change the price.",
        "Supply is fixed at 10,000 pairs. Demand shifts to the right, so the resale price rises and the number of pairs stays at 10,000.",
        "This is the Bitcoin example from class: with supply fixed at 21 million coins, growing demand shows up only as a higher price.",
        "Price and quantity rising together is the usual result when supply slopes upward, but here no new pairs can appear. \"Nothing changes\" overlooks that more buyers now compete for the same 10,000 pairs."
      ],
      "figure": {
        "kind": "sd",
        "xlabel": "Number of pairs",
        "ylabel": "Resale price",
        "panels": [
          {
            "caption": "Fixed supply of 10,000 pairs; demand shifts right",
            "demand": {
              "shift": "right",
              "size": "large"
            },
            "supply": {
              "vertical": true
            },
            "result": "Price rises, quantity stays at 10,000"
          }
        ]
      }
    },
    {
      "id": "m1-q08",
      "theme": "Revenue When the Price Changes",
      "source": "In-person lecture: Profit maximization (Econ-Simulator video game)",
      "kind": "numeric",
      "stem": "Suppose a small game studio in Culver City charges $2 per download for its mobile game and sells 9,000 downloads a month. Its market research shows that at $3 per download it would sell 5,000 downloads a month.",
      "ask": "If the studio raises the price from $2 to $3, what happens to its monthly revenue?",
      "choices": [
        "It rises by $9,000",
        "It rises by $5,000",
        "It falls by $3,000",
        "It falls by $8,000"
      ],
      "correct_index": 2,
      "hints": [
        "Revenue is the price multiplied by the quantity sold. Compute it at each of the two prices.",
        "At $2: $2 × 9,000 = $18,000 a month. Now do the same at $3.",
        "At $3: $3 × 5,000 = $15,000 a month. Compare this with $18,000."
      ],
      "solution": [
        "Rule: revenue = price × quantity sold.",
        "At $2: $2 × 9,000 = $18,000. At $3: $3 × 5,000 = $15,000. Revenue changes by $15,000 − $18,000 = −$3,000, so it falls by $3,000 a month.",
        "This is the trade-off from the Econ-Simulator discussion in class: a higher price earns more per download but sells fewer downloads. Here the lost downloads outweigh the extra dollar.",
        "The other options count only one side. +$5,000 is the extra $1 on the 5,000 downloads still sold. +$9,000 assumes no downloads are lost. −$8,000 is the 4,000 lost downloads at $2 each."
      ]
    },
    {
      "id": "m1-q09",
      "theme": "Gender Pay Gap",
      "source": "In-person lecture: The gender pay gap (McKinsey 2018 study)",
      "kind": "conceptual",
      "stem": "In class we saw a McKinsey (2018) study of U.S. companies. Women were 48% of entry-level employees, 38% of middle managers, 22% of the C-suite and 5% of CEOs.",
      "ask": "According to class, where does the gender pay gap mainly arise?",
      "choices": [
        "In entry-level hiring: companies hire far fewer women than men.",
        "In promotions: women move up to higher positions less often than men.",
        "In equal jobs: pay differs most within the same position and company.",
        "In the CEO job only: women hold about half of all positions below it."
      ],
      "correct_index": 1,
      "hints": [
        "Think of the class slide on the gender pay gap. It names one margin through which the differences mainly arise.",
        "Read the four numbers from the bottom of the corporate ladder to the top. Women's share falls at every step.",
        "Women are about half of entry-level employees, so hiring is not where the gap opens. What has to happen between entry level and the C-suite for the share to fall?"
      ],
      "solution": [
        "From class: the differences arise mainly through the promotion margin. Women have a harder time climbing the corporate ladder.",
        "The McKinsey numbers show it: women's share falls at every step up, from 48% at entry level to 38%, 22% and 5%. Class called this the leaky pipeline.",
        "The other options: women are about half of entry-level employees. Differences are smaller between men and women in the same position and company. Women's share is already down to 38% and 22% below the CEO level."
      ]
    }
  ]
})
