registerModule({
  "id": "m2",
  "title": "Module 2",
  "subtitle": "Elasticities, marginal revenue, MR vs. MC, opportunity cost, relevant costs, segment pricing, demand estimation",
  "questions": [
    {
      "id": "m2-q01",
      "theme": "Own-Price Elasticity from Percentage Changes",
      "source": "In-person lecture: Elasticities (Tesla warm-up exercise)",
      "kind": "numeric",
      "stem": "Diddy Riese, the cookie shop in Westwood Village near UCLA, is known for its ice cream sandwiches. Suppose it raises the price of an ice cream sandwich by 4%, and the number of sandwiches it sells falls by 10%.",
      "ask": "What is the own-price elasticity of demand for its ice cream sandwiches?",
      "choices": [
        "−2.5",
        "−0.4",
        "0.4",
        "2.5"
      ],
      "correct_index": 0,
      "hints": [
        "Own-price elasticity is the percentage change in quantity divided by the percentage change in price.",
        "Quantity fell, so its change is −10%. Price rose, so its change is +4%. The quantity change goes on top.",
        "Compute −10% ÷ 4%. Keep the minus sign: this course reports the own-price elasticity as a negative number."
      ],
      "solution": [
        "Rule: own-price elasticity = %ΔQ ÷ %ΔP.",
        "Apply it: −10% ÷ +4% = −2.5. A 1% price increase lowers the quantity sold by 2.5%.",
        "Common slips: −0.4 puts the price change on top (4 ÷ 10); 2.5 drops the minus sign, which this course keeps because price and quantity move in opposite directions; 0.4 makes both slips.",
        "This is the same one-division calculation as the Tesla warm-up from class."
      ]
    },
    {
      "id": "m2-q02",
      "theme": "Cross-Price Elasticity: Substitutes or Complements",
      "source": "Async video: Examples of Elasticities (cross-price elasticity)",
      "kind": "numeric",
      "stem": "The Catalina Express ferry carries visitors from Long Beach and San Pedro to Catalina Island. Suppose the ferry raises its fares by 10% and, as a result, the number of hotel nights booked in Avalon, the island's main town, falls by 2%.",
      "ask": "What is the cross-price elasticity of demand for Avalon hotel nights with respect to the ferry fare, and what does it tell you?",
      "choices": [
        "0.2, so ferry trips and hotel nights are substitutes",
        "−5, so ferry trips and hotel nights are complements",
        "−0.2, so ferry trips and hotel nights are substitutes",
        "−0.2, so ferry trips and hotel nights are complements"
      ],
      "correct_index": 3,
      "hints": [
        "Cross-price elasticity is the percentage change in the quantity of one good divided by the percentage change in the price of another good.",
        "Here the quantity is hotel nights (−2%) and the price is the ferry fare (+10%). Divide the first by the second.",
        "The result is negative. Recall the rule from the video: a positive cross-price elasticity means substitutes, a negative one means complements."
      ],
      "solution": [
        "Rule: cross-price elasticity = %ΔQ of one good ÷ %ΔP of the other good. Positive means substitutes; negative means complements.",
        "Apply it: −2% ÷ +10% = −0.2. A higher ferry fare lowers hotel bookings, so the two are bought together: they are complements.",
        "Common slips: 0.2 drops the minus sign; −5 divides the price change by the quantity change; calling a negative value \"substitutes\" reverses the rule.",
        "This is the pattern of ice cream and ice cream cones in the video: a higher price of cones lowers the demand for ice cream."
      ]
    },
    {
      "id": "m2-q03",
      "theme": "Marginal Revenue from Price and Elasticity",
      "source": "In-person lecture: Marginal revenue from price and elasticity (Tesla warm-up exercise)",
      "kind": "numeric",
      "stem": "Suppose a one-day ticket to Universal Studios Hollywood costs $150, and at that price the own-price elasticity of demand for tickets is −5.",
      "ask": "What is the marginal revenue from selling one more ticket?",
      "choices": [
        "$30",
        "$120",
        "$150",
        "$180"
      ],
      "correct_index": 1,
      "hints": [
        "Use the formula from the videos that gives marginal revenue from just the price and the own-price elasticity.",
        "MR = P × (1 − 1/|E|), where |E| is the elasticity without its minus sign. Here P = $150 and |E| = 5.",
        "1/5 = 0.2, so the term in parentheses is 1 − 0.2 = 0.8. Multiply the price by 0.8."
      ],
      "solution": [
        "Rule: MR = P × (1 − 1/|E|), where |E| is the elasticity without its minus sign.",
        "Apply it: MR = $150 × (1 − 1/5) = $150 × 0.8 = $120.",
        "Common slips: $30 is only P × 1/|E|, the part that must be subtracted from the price; $150 treats marginal revenue as equal to the price; $180 adds 1/5 instead of subtracting it.",
        "As in the Tesla warm-up from class, the price and the elasticity are all you need to calculate marginal revenue."
      ]
    },
    {
      "id": "m2-q04",
      "theme": "Comparing Marginal Revenue with Marginal Cost",
      "source": "In-person lecture: Comparing MR with MC (class case study)",
      "kind": "conceptual",
      "stem": "Amoeba Music is a large independent record store in Hollywood. Suppose it sells a new vinyl record for $35. At that price its marginal revenue is $21 and its marginal cost is $26.",
      "ask": "To increase its profit, what should Amoeba do?",
      "choices": [
        "Lower the price, which increases the number of records sold.",
        "Keep the price, because marginal revenue is still positive.",
        "Raise the price, which reduces the number of records sold.",
        "Keep the price, because the price is above marginal cost."
      ],
      "correct_index": 2,
      "hints": [
        "Use the profit-maximization rule from the videos: compare marginal revenue (MR) with marginal cost (MC).",
        "Here MR = $21 and MC = $26. Ask whether the last record sold adds more to revenue or more to cost.",
        "The last record adds $21 of revenue and $26 of cost, so the store is selling too many. Think about what must happen to the price for it to sell fewer."
      ],
      "solution": [
        "Rule: if MR > MC, increase the quantity (by lowering the price). If MR < MC, reduce the quantity (by raising the price).",
        "Apply it: MR = $21 is below MC = $26, so the last record adds more to cost than to revenue. Amoeba should sell fewer records, which means raising the price.",
        "Common slips: the comparison that matters is MR with MC, not price with MC, so a $35 price above the $26 marginal cost does not settle it; and a positive MR is not enough when MC is larger.",
        "Class made the same comparison in a case study where MR was above MC and the advice went the other way: sell more by cutting the price."
      ]
    },
    {
      "id": "m2-q05",
      "theme": "Economic Profit vs. Accounting Profit",
      "source": "In-person lecture: The Principle of Opportunity Cost (practice exercise)",
      "kind": "numeric",
      "stem": "Suppose Priya plans to leave her job and open a vintage clothing shop on Melrose Avenue in Los Angeles. She projects first-year revenues of $500,000 and costs of $380,000. To run the shop she would give up her current salary of $90,000.",
      "ask": "What is her expected economic profit in the first year?",
      "choices": [
        "$30,000",
        "$90,000",
        "$120,000",
        "$210,000"
      ],
      "correct_index": 0,
      "hints": [
        "Economic profit, unlike accounting profit, also subtracts opportunity costs: the value of the next best alternative she gives up.",
        "Start with accounting profit: revenues minus costs = $500,000 − $380,000. Then ask what she gives up by running the shop.",
        "Accounting profit is $120,000. Her opportunity cost is the $90,000 salary she would no longer earn. Subtract it."
      ],
      "solution": [
        "Rule: economic profit = revenues − costs − opportunity cost. The opportunity cost is the value of the next best alternative, here the salary she gives up.",
        "Apply it: accounting profit = $500,000 − $380,000 = $120,000. Economic profit = $120,000 − $90,000 = $30,000.",
        "Common slips: $90,000 is the opportunity cost itself; $120,000 is the accounting profit and ignores the salary she gives up; $210,000 adds the salary instead of subtracting it.",
        "Economic profit is positive, so the shop beats her next best alternative. In the practice exercise from class (the \"Uber for therapists\"), the same calculation gave a negative number."
      ]
    },
    {
      "id": "m2-q06",
      "theme": "Principle of Relevant Costs",
      "source": "In-person lecture: Principle of Relevant Costs (the cost of a full-time MBA)",
      "kind": "conceptual",
      "stem": "Suppose a concert promoter is choosing between the Hollywood Bowl and the Greek Theatre for a one-night show. The band's fee is $200,000 at either venue. The venue rental, the number of seats and the ticket price all differ between the two.",
      "ask": "According to the principle of relevant costs, which item should the promoter ignore when choosing between the two venues?",
      "choices": [
        "The venue rental",
        "The number of seats",
        "The ticket price",
        "The band's fee"
      ],
      "correct_index": 3,
      "hints": [
        "The principle of relevant costs: a cost that is common to all the alternatives does not affect which one is best.",
        "Go through the four items and ask of each one: is it the same at the Hollywood Bowl and at the Greek Theatre?",
        "Only one item is identical under both choices. It adds the same weight to both sides of the scale, so it cannot tip the balance."
      ],
      "solution": [
        "Rule: if a cost is the same under every alternative, ignore it. It cannot change which alternative is best.",
        "Apply it: the band's $200,000 fee is paid at either venue, so it cancels out of the comparison. It is a large number, but it is not relevant to this choice.",
        "The venue rental, the number of seats and the ticket price differ between the two venues, so they are what the decision should rest on.",
        "Class used the same logic for the full-time MBA: living expenses you would pay anyway are not a relevant cost of the degree."
      ]
    },
    {
      "id": "m2-q07",
      "theme": "Segment Pricing: Arbitrage",
      "source": "In-person lecture: Segment Pricing (challenges with segment pricing)",
      "kind": "conceptual",
      "stem": "Replica Los Angeles Rams jerseys are sold at the team store at SoFi Stadium. Suppose the store charges season-ticket holders $80 and all other fans $100 for the same jersey. Suppose also that some season-ticket holders start buying extra jerseys and reselling them to other fans for $90.",
      "ask": "Which challenge with segment pricing does this illustrate?",
      "choices": [
        "Consumer backlash",
        "Arbitrage",
        "Opportunity cost",
        "Left-digit bias"
      ],
      "correct_index": 1,
      "hints": [
        "Segment pricing means charging different groups different prices for the same product. Class named two challenges that can get in its way.",
        "One of the two challenges is about how customers feel when they learn that others pay less. The other is about what buyers can do with the price difference.",
        "Nobody is complaining here. People who can buy at the low price are reselling to people who face the high price."
      ],
      "solution": [
        "Rule: arbitrage is buying where the price is low and reselling where the price is high. It is one of the two challenges with segment pricing named in class.",
        "Apply it: season-ticket holders buy at $80 and resell at $90, so the fans who buy from them no longer pay the store $100. The price difference between the two groups is hard to keep. That is arbitrage.",
        "The other options: consumer backlash, the second challenge from class, is customers resenting that others pay less for the same product, and nobody is complaining here. Opportunity cost and left-digit bias are other ideas from this module that have nothing to do with reselling.",
        "Class raised the same point in the BMW discussion: resellers could buy the car where it is cheaper and resell it where it is more expensive."
      ]
    },
    {
      "id": "m2-q08",
      "theme": "Reading Regression Output: the Price Coefficient",
      "source": "Async video: Linear Regression: Interpreting Regression Output",
      "kind": "conceptual",
      "stem": "Suppose an analyst at the Aquarium of the Pacific in Long Beach runs a linear regression of the number of tickets sold per day (Q) on the ticket price in dollars (P). The coefficients from the Excel output are shown below.",
      "table": {
        "headers": [
          "Variable",
          "Coefficients"
        ],
        "rows": [
          [
            "Intercept",
            "6,000"
          ],
          [
            "Price (P)",
            "−50"
          ]
        ]
      },
      "ask": "What does the coefficient on price tell you?",
      "choices": [
        "If the price were $0, expected sales would be 50 tickets per day.",
        "The own-price elasticity of demand for aquarium tickets is −50.",
        "If the price rises by $1, expected sales fall by 50 tickets per day.",
        "If the price rises by $1, expected sales rise by 50 tickets per day."
      ],
      "correct_index": 2,
      "hints": [
        "The coefficients give the estimated demand line Q = a + b × P, where a is the intercept and b is the coefficient on price.",
        "Here the line is Q = 6,000 − 50 × P. Ask what happens to Q when P goes up by one unit, that is, by $1.",
        "The coefficient on price is the slope of the line: its sign gives the direction of the change in Q, and its size gives the number of tickets per $1."
      ],
      "solution": [
        "Rule: a coefficient says how much the dependent variable is expected to change when that independent variable rises by one unit. Its sign gives the direction.",
        "Apply it: the estimated demand is Q = 6,000 − 50 × P. If the price rises by $1, the aquarium is expected to sell 50 fewer tickets per day.",
        "Common slips: the minus sign means sales fall, not rise; the quantity at a price of $0 is the intercept (6,000), not the price coefficient; the coefficient is a slope in tickets per dollar, not an elasticity, which compares percentage changes.",
        "The video reads the airline output the same way: a coefficient of −1.63 means that a $1 higher price lowers expected sales by 1.63 seats."
      ]
    },
    {
      "id": "m2-q09",
      "theme": "Which Curve a Regression Recovers",
      "source": "In-person lecture: Demand Estimation (linear regression when supply or demand shifts)",
      "kind": "conceptual",
      "stem": "Suppose an analyst has monthly data on the price of gasoline and the gallons sold in Los Angeles County. Over these months, the demand curve for gasoline stayed fixed, but refinery outages shifted the supply curve back and forth.",
      "ask": "If she fits a regression line through these price and quantity points, which curve does the line trace?",
      "choices": [
        "The supply curve",
        "The demand curve",
        "The marginal revenue curve",
        "A mix of supply and demand"
      ],
      "correct_index": 1,
      "hints": [
        "Each data point is a market equilibrium: the point where that month's supply curve crosses that month's demand curve.",
        "Sketch one demand curve that stays put and several supply curves. Mark the point where each supply curve crosses the demand curve.",
        "All the crossing points lie on the curve that did not move. The regression line runs through those points."
      ],
      "solution": [
        "Rule: a regression line through past prices and quantities connects equilibrium points. Which curve it traces depends on which curve moved.",
        "Apply it: demand stayed fixed and supply shifted, so every equilibrium lies on the same demand curve. The fitted line traces the demand curve. Class called this the best-case scenario (Case 1: Shift in Supply Curve).",
        "If only demand had shifted, the points would trace the supply curve. If both had shifted, the line would be a mix that matches neither curve. Marginal revenue plays no role: the data are market prices and quantities."
      ]
    },
    {
      "id": "m2-q10",
      "theme": "A/B Testing as the Gold Standard",
      "source": "In-person lecture: Demand Estimation (A/B testing and price experiments)",
      "kind": "conceptual",
      "stem": "Suppose the Petersen Automotive Museum on Wilshire Boulevard tests its online ticket price. Each visitor to its website is randomly shown either the regular $32 price or a $28 promotional price, and the museum compares the share of visitors who buy at each price.",
      "ask": "Why is this kind of price experiment considered the most reliable way to estimate demand?",
      "choices": [
        "Because it uses more data than a regression would.",
        "Because customers state their true willingness to pay.",
        "Because customers do not mind others paying a lower price.",
        "Because random assignment makes the price effect causal."
      ],
      "correct_index": 3,
      "hints": [
        "The tool is A/B testing: randomly assign different prices to different customers and compare what they buy.",
        "With past data, something else may change at the same time as the price. Ask what random assignment does to those other factors.",
        "Chance decides who sees which price, so the two groups of visitors are alike in everything except the price they were shown."
      ],
      "solution": [
        "Rule: in an A/B test the firm randomly assigns different prices to different customers and compares their purchases. Because of the randomization, the effect of price on the quantity sold is causal. Class called this the gold standard.",
        "Apply it: chance decides which visitors see $28 and which see $32, so the two groups are alike except for the price. A difference in the share who buy can be attributed to the price.",
        "Why the others are wrong: the amount of data is not what makes an experiment reliable, the random assignment is; stated willingness to pay describes surveys, not experiments; and customers may be upset to learn that others paid less, which class listed as a downside of price experiments."
      ]
    }
  ]
})
