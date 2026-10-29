registerModule({
  "id": "m1",
  "title": "Module 1",
  "subtitle": "Firm value, thinking at the margin, supply and demand",
  "questions": [
    {
      "id": "m1-q01",
      "theme": "Value of the Firm (Present Discounted Value)",
      "source": "In-person Lecture 1: Economic Principles",
      "kind": "numeric",
      "stem": "Westwood Robotics is a two-year-old startup. This year it will earn revenues of $4 million and incur costs of $6 million. Next year it expects revenues of $12 million and costs of $6.5 million, after which it will be shut down. The discount rate is 10% per year.",
      "ask": "Using the definition of firm value from class, what is the value of Westwood Robotics today?",
      "choices": [
        "$3.5 million",
        "$5.0 million",
        "$3.0 million",
        "−$2.0 million"
      ],
      "correct_index": 2,
      "hints": [
        "Firm value is the present discounted value of the stream of net profits (revenue minus cost) in every period, not just this year's profit.",
        "Compute net profit in each year first: this year's is $4M − $6M; next year's is $12M − $6.5M. Only next year's needs to be discounted.",
        "V = (R0 − C0) + (R1 − C1)/(1 + r) = −2 + 5.5/1.1. Note that 5.5/1.1 = 5 exactly."
      ],
      "solution": [
        "Net profit this year: $4M − $6M = −$2M (received today, no discounting).",
        "Net profit next year: $12M − $6.5M = $5.5M. Discounted to today: $5.5M / 1.10 = $5.0M.",
        "Value of the firm: V = −$2M + $5.0M = $3.0M.",
        "Common mistakes: $3.5M ignores discounting (−2 + 5.5); $5.0M ignores this year's loss; −$2.0M looks only at current profit. Like Amazon or Uber in their early years, a firm can be losing money today and still be valuable because of expected future profits."
      ]
    },
    {
      "id": "m1-q02",
      "theme": "Firm Value vs. Market Share",
      "source": "In-person Lecture 1: Economic Principles (Ford example)",
      "kind": "conceptual",
      "stem": "The new CEO of Bruin Motors announces that the company's number-one priority for the next five years is to overtake its main rival in units sold, \"whatever it takes,\" including deep price cuts and heavy spending on dealerships. The company's stock price falls sharply the same day.",
      "ask": "Which explanation for the stock price drop is most consistent with how economists define the value of a firm?",
      "choices": [
        "Investors infer that the CEO is willing to sacrifice the present value of future net profits in order to gain market share, which lowers the value of the firm.",
        "A higher market share always lowers total revenue, so investors expect revenues to fall.",
        "Firm value is determined by this quarter's accounting profit, and the announcement lowers this quarter's profit.",
        "Market share and firm value are unrelated, so the announcement carried no information and the drop is a coincidence."
      ],
      "correct_index": 0,
      "hints": [
        "Recall the goal of the firm from class: maximize the present discounted value of future net profits, not units sold, revenue, or market share.",
        "Ask what the CEO's plan implies for future net profits: price cuts and heavy spending raise the chance that future revenues minus costs shrink.",
        "The stock price is the market's estimate of firm value. If investors now expect lower future profits, the estimated value, and hence the stock price, falls."
      ],
      "solution": [
        "Economists define firm value as the present discounted value of future net profits. Market share matters only insofar as it raises future profits.",
        "By committing to gain market share \"whatever it takes,\" the CEO signals a willingness to cut prices and raise spending even when that reduces future net profits. Investors revise down their estimate of firm value, so the stock price falls.",
        "This mirrors the Ford example from class: when CEO Alexander Trotman announced the goal of beating GM's market share, Ford's stock price fell on impact.",
        "Why the others are wrong: (B) higher market share does not always reduce revenue; (C) value depends on the whole future path of profits, not one quarter of accounting profit; (D) the announcement clearly carried information about future profits."
      ]
    },
    {
      "id": "m1-q03",
      "theme": "Marginal Cost vs. Average Cost",
      "source": "In-person Lecture 1: Practice exercise (workout sessions)",
      "kind": "numeric",
      "stem": "A Santa Monica pilates studio computes that the total cost of running 3 classes in a day is $75, and the total cost of running 4 classes in a day is $92.",
      "ask": "What is the marginal cost of the fourth class?",
      "choices": [
        "$23",
        "$17",
        "$25",
        "$92"
      ],
      "correct_index": 1,
      "hints": [
        "Marginal cost is the additional cost of one more unit of the activity, in this case the extra cost caused by going from 3 classes to 4.",
        "You do not need to divide anything. Compare the two totals.",
        "MC of the 4th class = Total cost of 4 classes − Total cost of 3 classes."
      ],
      "solution": [
        "MC(4th class) = TC(4) − TC(3) = $92 − $75 = $17.",
        "The accountant's instinct is to compute the average cost, $92 / 4 = $23 (or $75 / 3 = $25 for three classes). But the average is not what matters for the decision of whether to add a fourth class; the increment is.",
        "If the fourth class brings in more than $17 of extra revenue, it is worth running, even though the average cost per class is $23."
      ]
    },
    {
      "id": "m1-q04",
      "theme": "Principle of Maximum Net Advantage",
      "source": "In-person Lecture 1: Thinking at the margin",
      "kind": "numeric",
      "stem": "Taco Bruin is deciding how many food trucks to send to a weekend festival in Long Beach. Its analyst ranks the trucks from the best location to the worst and estimates, for each additional truck, the extra revenue it would bring (marginal benefit) and the extra cost it would create (marginal cost):",
      "table": {
        "headers": [
          "Truck",
          "Marginal benefit (extra revenue)",
          "Marginal cost (extra cost)"
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
            "$580",
            "$550"
          ],
          [
            "4th",
            "$400",
            "$650"
          ],
          [
            "5th",
            "$300",
            "$800"
          ]
        ]
      },
      "ask": "How many trucks should Taco Bruin send to maximize its net benefit (total benefit minus total cost)?",
      "choices": [
        "2 trucks",
        "3 trucks",
        "4 trucks",
        "5 trucks"
      ],
      "correct_index": 1,
      "hints": [
        "Apply the principle of maximum net advantage: keep adding trucks as long as the marginal benefit of the next truck exceeds its marginal cost, and stop when it no longer does.",
        "Compute the net gain of each additional truck: MB − MC. The 1st truck adds $900 − $400 = +$500; the 2nd adds +$200. Keep going.",
        "The 3rd truck adds $580 − $550 = +$30 > 0, so it is still worth sending. The 4th adds $400 − $650 = −$250, so it would reduce net benefit."
      ],
      "solution": [
        "Net gain from each additional truck: 1st: +$500; 2nd: +$200; 3rd: +$30; 4th: −$250; 5th: −$500.",
        "Send trucks while MB > MC: trucks 1, 2 and 3 each add to net benefit; trucks 4 and 5 subtract from it. The optimum is 3 trucks, with a total net benefit of $500 + $200 + $30 = $730.",
        "A tempting mistake is to send 4 trucks because the cumulative net benefit is still positive ($730 − $250 = $480 > 0). But the decision is about the increment: the 4th truck lowers net benefit from $730 to $480. Positive total profit is not the stopping rule; MB = MC (or the last unit for which MB exceeds MC) is.",
        "This is the same logic as the coffee-shop example from class: open stores until the marginal revenue of the next store no longer covers its marginal cost."
      ]
    },
    {
      "id": "m1-q05",
      "theme": "Economic Models",
      "source": "Async video: Economic Models (maps, homo economicus, hedgehog vs. fox)",
      "kind": "conceptual",
      "stem": "A first-year analyst objects to using a supply-and-demand model to forecast rents in Los Angeles: \"It ignores neighborhood reputation, landlord personalities and the weather. Since the model is unrealistic, we should not use it.\"",
      "ask": "Which response best reflects how this course thinks about economic models?",
      "choices": [
        "The analyst is right: a model should be discarded as soon as one of its assumptions is false.",
        "A good model should include every factor that could possibly matter so that its predictions are exact.",
        "Supply and demand can only be applied to markets in which every consumer is perfectly rational, selfish and fully informed, so it cannot be used for rental housing.",
        "Economic models are deliberately simplified, like maps. A model is judged by whether it is useful for the decision at hand, not by whether it is realistic, and the right amount of detail depends on the question."
      ],
      "correct_index": 3,
      "hints": [
        "Think about the map analogy: a map that showed every detail of Los Angeles would be more accurate but useless for driving to San Francisco.",
        "Recall the course's slogan: models are always wrong, but sometimes they are useful.",
        "The homo economicus assumptions (selfish, rational, informed) are known to be false in reality. The point is not that they are true, but that they simplify the problem enough to give quick, useful answers."
      ],
      "solution": [
        "Economic models are theoretical frameworks that abstract away from most of the nuance of the real world to focus on what matters most for the decision at hand.",
        "Like maps, models come in different levels of detail: a highway map for driving LA to SF, a street map for getting around town, a parcel map for delivering packages. More detail is not always better.",
        "The assumptions of homo economicus (100% selfish, 100% rational, 100% informed) are unrealistic on purpose. The course adopts the \"hedgehog\" approach: one organizing principle applied quickly to many problems, accepting some loss of nuance.",
        "Why the others are wrong: (A) and (B) confuse realism with usefulness; (C) misreads the assumptions as preconditions rather than simplifications."
      ]
    },
    {
      "id": "m1-q06",
      "theme": "Market Demand from Willingness to Pay; Consumer Surplus (discrete)",
      "source": "Async videos: The Law of Demand; Consumer Surplus",
      "kind": "numeric",
      "stem": "Five friends are each considering buying one ticket to a UCLA basketball game. Their maximum willingness to pay (WTP) for a ticket is: Ana $80, Ben $65, Chloe $50, Dev $35 and Emma $20. Tickets sell for $50.",
      "ask": "What is the total consumer surplus of the group?",
      "choices": [
        "$45",
        "$150",
        "$195",
        "$250"
      ],
      "correct_index": 0,
      "hints": [
        "First find who buys: a person buys if their WTP is at least the price of $50.",
        "Each buyer's consumer surplus is WTP − price. People who do not buy get a consumer surplus of zero (not a negative number).",
        "Ana: $80 − $50 = $30; Ben: $65 − $50 = $15; Chloe: $50 − $50 = $0. Add them up."
      ],
      "solution": [
        "Buyers at a price of $50: Ana ($80), Ben ($65) and Chloe ($50). Dev ($35) and Emma ($20) do not buy. Quantity demanded = 3 tickets.",
        "Consumer surplus: Ana $30 + Ben $15 + Chloe $0 = $45.",
        "Total revenue for the seller is the rectangle price × quantity = $50 × 3 = $150 (choice B). The total value to the buyers is $80 + $65 + $50 = $195 (choice C), and $250 is the sum of everyone's WTP, including non-buyers (choice D).",
        "This is the pizza example from the videos: ordering consumers from highest to lowest WTP gives the staircase-shaped demand curve, and consumer surplus is the area between that staircase and the price."
      ],
      "figure": {
        "kind": "staircase",
        "wtp": [
          80,
          65,
          50,
          35,
          20
        ],
        "names": [
          "Ana",
          "Ben",
          "Chloe",
          "Dev",
          "Emma"
        ],
        "price": 50,
        "xlabel": "Tickets",
        "ylabel": "WTP ($)",
        "areas": {
          "cs": "Consumer surplus = $45",
          "revenue": "Revenue = $150"
        }
      }
    },
    {
      "id": "m1-q07",
      "theme": "Consumer Surplus and Revenue (continuous demand)",
      "source": "Async video: Consumer Surplus (continuous case)",
      "kind": "numeric",
      "stem": "The weekly inverse demand for surf lessons at a Venice Beach surf school is P = 50 − Q, where P is the price per lesson in dollars and Q is the number of lessons per week. The school charges $20 per lesson.",
      "ask": "What is the weekly consumer surplus?",
      "choices": [
        "$900",
        "$600",
        "$450",
        "$1,050"
      ],
      "correct_index": 2,
      "hints": [
        "First find the quantity demanded at the $20 price by plugging P = 20 into the inverse demand function.",
        "Consumer surplus is the triangle below the demand curve and above the price. The height of the triangle is the intercept of the demand curve (the price at which Q = 0) minus the price charged.",
        "Area of a triangle = ½ × base × height, with base = 30 lessons and height = $50 − $20 = $30."
      ],
      "solution": [
        "Quantity demanded: 20 = 50 − Q, so Q = 30 lessons per week.",
        "Consumer surplus = ½ × 30 × ($50 − $20) = ½ × 30 × 30 = $450.",
        "Revenue is the rectangle price × quantity = $20 × 30 = $600 (choice B). Choice A ($900) forgets the ½ in the area of the triangle. Choice D ($1,050) is consumer surplus plus revenue, i.e. the whole area under the demand curve up to Q = 30."
      ],
      "figure": {
        "kind": "demand-areas",
        "intercept": 50,
        "slope": 1,
        "price": 20,
        "xmax": 50,
        "ymax": 50,
        "xlabel": "Lessons per week",
        "ylabel": "Price ($)",
        "areas": {
          "cs": "Consumer surplus = ½ × 30 × 30 = $450",
          "revenue": "Revenue = $20 × 30 = $600"
        },
        "marks": {
          "q": "Q = 30",
          "p": "P = $20"
        }
      }
    },
    {
      "id": "m1-q08",
      "theme": "Change in Demand vs. Change in Quantity Demanded",
      "source": "Async video: Factors Affecting Demand (the 4 Ps)",
      "kind": "conceptual",
      "stem": "Bruin Bakery sells croissants in Culver City. Consider four events, each happening on its own.",
      "ask": "Which event would be represented as a shift of the demand curve for Bruin Bakery's croissants, rather than as a movement along it (or a shift of a different curve)?",
      "choices": [
        "Bruin Bakery cuts its price from $5 to $4 and sells more croissants.",
        "A popular food influencer posts a rave review of the croissants, and more customers show up at every price.",
        "Bruin Bakery raises its price to $6 and sells fewer croissants.",
        "Bruin Bakery finds a cheaper flour supplier."
      ],
      "correct_index": 1,
      "hints": [
        "A change in the product's own price never shifts its demand curve; it moves you along the curve (a change in quantity demanded).",
        "Of the 4 Ps of marketing (product, promotion, place, price), only the first three shift demand.",
        "A cheaper input affects the sellers' willingness to supply, not the buyers' willingness to buy."
      ],
      "solution": [
        "(B) Promotion raises the quantity demanded at every price: the whole demand curve shifts to the right. This is a change in demand.",
        "(A) and (C) are changes in the bakery's own price, which are movements along the same demand curve: changes in quantity demanded, not changes in demand.",
        "(D) A cheaper input lowers the bakery's costs and shifts the supply curve to the right; it does not change how much customers want croissants at each price.",
        "Remember from the video: price is the fourth P, but it is not a factor that affects demand; it affects the quantity demanded."
      ]
    },
    {
      "id": "m1-q09",
      "theme": "Demand Function vs. Inverse Demand Function",
      "source": "Async video: Inverse Demand Function (Alfred Marshall)",
      "kind": "numeric",
      "stem": "A boba tea shop in Westwood estimates that the weekly demand for its drinks is Q = 1,200 − 4P, where Q is drinks per week and P is the price in dollars.",
      "ask": "Which of the following is the corresponding inverse demand function (the one you would draw in a chart with price on the vertical axis)?",
      "choices": [
        "P = 0.25Q − 300",
        "P = 1,200 − 4Q",
        "Q = 300 − 0.25P",
        "P = 300 − 0.25Q"
      ],
      "correct_index": 3,
      "hints": [
        "The demand function gives Q as a function of P. The inverse demand function gives P as a function of Q. To get it, solve the demand equation for P.",
        "Start from Q = 1,200 − 4P and move the terms: 4P = 1,200 − Q.",
        "Divide both sides by 4. Then check your answer with a point: at P = $100 the demand function gives Q = 800; the inverse demand function should return P = $100 when Q = 800."
      ],
      "solution": [
        "Q = 1,200 − 4P  ⇒  4P = 1,200 − Q  ⇒  P = 300 − 0.25Q.",
        "Check: at P = 100, Q = 1,200 − 400 = 800. Plugging Q = 800 into the inverse demand: P = 300 − 0.25 × 800 = 300 − 200 = 100. ✓",
        "The demand curve and the inverse demand curve are two sides of the same coin: choosing P = $100 yields Q = 800, and choosing Q = 800 yields P = $100. What you cannot do is choose both at once.",
        "Choice B simply swaps the letters; choice C is not solved for P; choice A has the wrong signs (it would slope upward)."
      ]
    },
    {
      "id": "m1-q10",
      "theme": "Market Equilibrium",
      "source": "Async video: Equilibrium and Comparative Statics; In-person Lecture 2: The Market Mechanism",
      "kind": "conceptual",
      "stem": "Sawtelle Ramen charges $14 per bowl. Every night there is a line out the door, the kitchen runs out of broth by 8 pm, and many customers leave without being served.",
      "ask": "In supply-and-demand terms, which statement best describes the situation?",
      "choices": [
        "The price is below the market-clearing level: there is excess demand, and the restaurant could raise its price without losing all its customers.",
        "The price is above the market-clearing level: there is excess supply, and the restaurant should cut its price.",
        "The market is in equilibrium because the restaurant sells everything it produces.",
        "The demand curve for ramen has shifted to the left."
      ],
      "correct_index": 0,
      "hints": [
        "At the equilibrium price, quantity demanded equals quantity supplied: nobody who wants to buy at that price is turned away, and nothing goes unsold.",
        "Here more people want bowls at $14 than the restaurant is willing and able to serve. Which is larger, quantity demanded or quantity supplied?",
        "When quantity demanded exceeds quantity supplied, the price is below equilibrium and competition among buyers pushes it up."
      ],
      "solution": [
        "Long lines and customers turned away mean quantity demanded exceeds quantity supplied at $14: excess demand. That can only happen when the price is below the equilibrium price.",
        "Selling out is not the same as being in equilibrium. In equilibrium the last customer willing to pay the price is served; here many willing customers are not.",
        "The market mechanism pushes the price up in this situation: some customers would pay more than $14 rather than wait or leave, so the restaurant could raise the price and still sell all its bowls.",
        "Choice B describes the opposite situation (unsold food). Choice D would reduce lines, not create them."
      ]
    },
    {
      "id": "m1-q11",
      "theme": "Comparative Statics: A Single Demand Shock",
      "source": "In-person Lecture 2: Effects of AI on the labor market for junior software developers",
      "kind": "conceptual",
      "stem": "Consider the market for freelance human translators in Los Angeles. In 2023, AI translation tools become good enough that many firms stop hiring human translators for routine documents. Assume the number of people willing to work as translators at each wage (the supply curve) is unchanged.",
      "ask": "What does the supply-and-demand model predict for the equilibrium wage and the equilibrium number of translators employed?",
      "choices": [
        "Wage rises and employment rises.",
        "Wage falls and employment rises.",
        "Wage falls and employment falls.",
        "Wage rises and employment falls."
      ],
      "correct_index": 2,
      "hints": [
        "Identify the market: the quantity is the number of translators, the price is the wage. Employers are the buyers (demand); translators are the sellers (supply).",
        "The AI tools make employers want fewer translators at every wage. Which curve shifts, and in which direction?",
        "Slide the demand curve to the left along a fixed upward-sloping supply curve and read off the new intersection."
      ],
      "solution": [
        "The shock reduces employers' demand for translators at any given wage: the demand curve shifts to the left. Supply is unchanged.",
        "The new intersection with the upward-sloping supply curve is at a lower wage and a lower quantity: both the wage and the number of translators employed fall.",
        "This is the same analysis as the software-developer example in class (Brynjolfsson et al., 2025): a leftward demand shift lowers both equilibrium price and quantity. How much each falls depends on the slopes of the two curves.",
        "Choice B would require a rightward supply shift; choices A and D would require a leftward supply shift or a rightward demand shift."
      ],
      "figure": {
        "kind": "sd",
        "xlabel": "Translators employed",
        "ylabel": "Wage",
        "plabel": "W",
        "qlabel": "L",
        "panels": [
          {
            "caption": "AI tools reduce employers' demand for translators; supply unchanged",
            "demand": {
              "shift": "left",
              "size": "large"
            },
            "supply": {
              "shift": "none"
            },
            "result": "Wage falls, employment falls"
          }
        ]
      }
    },
    {
      "id": "m1-q12",
      "theme": "Comparative Statics: Inferring Shifts from Data",
      "source": "In-person Lecture 2: The market for copper",
      "kind": "conceptual",
      "stem": "Between 2016 and 2026, annual sales of electric scooters in California increased roughly tenfold, while the inflation-adjusted price of a typical scooter stayed roughly constant.",
      "ask": "Which explanation is most consistent with these two facts?",
      "choices": [
        "The demand curve shifted to the right and the supply curve shifted to the left.",
        "Both the demand curve and the supply curve shifted to the right by roughly similar amounts.",
        "Only the demand curve shifted to the right; supply did not change.",
        "Only the supply curve shifted to the right; demand did not change."
      ],
      "correct_index": 1,
      "hints": [
        "Work out what each candidate explanation predicts for price and quantity, then compare with the facts: quantity up a lot, price roughly flat.",
        "A rightward demand shift alone raises both price and quantity. A rightward supply shift alone raises quantity but lowers price.",
        "For quantity to rise a lot while price stays flat, you need the upward pressure on price from one shift to be offset by the downward pressure from the other."
      ],
      "solution": [
        "(C) Demand right only: P up, Q up. Contradicts the flat price. (D) Supply right only: P down, Q up. Contradicts the flat price. (A) Demand right and supply left: P up for sure, Q ambiguous. Contradicts both facts.",
        "(B) Demand right (more people want scooters: new uses, income growth, better products) and supply right (cheaper batteries, more manufacturers): both shifts raise quantity, while their effects on price roughly cancel. This matches the data.",
        "This is exactly the copper story from class: consumption rose more than 100-fold over 140 years while the real price stayed roughly constant, because industrialization shifted demand out while mining and transportation advances shifted supply out."
      ],
      "figure": {
        "kind": "sd",
        "xlabel": "Scooters sold",
        "ylabel": "Price",
        "panels": [
          {
            "caption": "Demand and supply both shift right by similar amounts",
            "demand": {
              "shift": "right",
              "size": "large"
            },
            "supply": {
              "shift": "right",
              "size": "large"
            },
            "result": "Quantity rises a lot; price roughly unchanged"
          }
        ]
      }
    },
    {
      "id": "m1-q13",
      "theme": "Comparative Statics: Simultaneous Supply and Demand Shocks",
      "source": "Async video: Equilibrium and Comparative Statics; Problem Set 1 (orange juice)",
      "kind": "conceptual",
      "stem": "A late frost destroys a large share of California's strawberry crop. The same month, a widely publicized medical study links eating strawberries to a lower risk of heart disease.",
      "ask": "After both events, what happens to the equilibrium price and quantity of strawberries?",
      "choices": [
        "Price rises; quantity falls.",
        "The change in price is ambiguous; quantity falls.",
        "Price rises; quantity rises.",
        "Price rises; the change in quantity is ambiguous."
      ],
      "correct_index": 3,
      "hints": [
        "Assign each event to a curve: the frost affects growers' ability to supply; the study affects consumers' desire to buy.",
        "The frost shifts supply to the left (P up, Q down). The study shifts demand to the right (P up, Q up).",
        "Compare the two effects: both push price the same way, but they push quantity in opposite directions. Which one is unambiguous?"
      ],
      "solution": [
        "Supply shifts left because of the frost: on its own, price rises and quantity falls.",
        "Demand shifts right because of the study: on its own, price rises and quantity rises.",
        "Price: both shifts push it up, so the price rises unambiguously. Quantity: the supply shift pushes it down and the demand shift pushes it up, so the net effect depends on which shift is larger. It is ambiguous.",
        "Choices A and C pick one of the two possible outcomes for quantity, but without knowing the sizes of the shifts, neither can be guaranteed. Choice B has the ambiguity on the wrong variable."
      ],
      "figure": {
        "kind": "sd",
        "xlabel": "Strawberries",
        "ylabel": "Price",
        "panels": [
          {
            "caption": "Case 1: the supply shift is larger",
            "demand": {
              "shift": "right",
              "size": "small"
            },
            "supply": {
              "shift": "left",
              "size": "large"
            },
            "result": "Price rises, quantity falls"
          },
          {
            "caption": "Case 2: the demand shift is larger",
            "demand": {
              "shift": "right",
              "size": "large"
            },
            "supply": {
              "shift": "left",
              "size": "small"
            },
            "result": "Price rises, quantity rises"
          }
        ]
      }
    },
    {
      "id": "m1-q14",
      "theme": "Comparative Statics: Inferring Shifts from Data",
      "source": "In-person Lecture 2: Los Angeles housing market",
      "kind": "conceptual",
      "stem": "Over the past year, both the inflation-adjusted price of used cars sold in Los Angeles and the number of used cars sold have fallen.",
      "ask": "Which of the following is consistent with these facts?",
      "choices": [
        "The demand curve shifted to the left (possibly together with a smaller leftward shift of the supply curve).",
        "The supply curve shifted to the right and the demand curve did not change.",
        "The demand curve shifted to the right and the supply curve did not change.",
        "The supply curve shifted to the left and the demand curve did not change."
      ],
      "correct_index": 0,
      "hints": [
        "For each candidate, work out the predicted direction of price and quantity and compare to the data: both fell.",
        "Supply right alone: P down, Q up. Demand right alone: P up, Q up. Supply left alone: P up, Q down. None of those matches.",
        "Only a leftward demand shift lowers both price and quantity. A leftward supply shift can be added on top as long as the demand shift dominates the price effect."
      ],
      "solution": [
        "(B) predicts lower price but higher quantity. (C) predicts higher price and higher quantity. (D) predicts higher price and lower quantity. None fits the facts.",
        "(A) A leftward demand shift (for example, higher interest rates on car loans or fewer people moving to LA) lowers both price and quantity. If supply also shifted left (fewer owners willing to sell), quantity falls even more; the price effect of that supply shift is more than offset by the demand shift, so the price still falls on net.",
        "This is the reasoning from the LA housing case in class: real prices fell 5% and sales fell 40%, which is consistent with demand falling (mortgage rates, migration) and supply falling too (owners locked into low mortgage rates)."
      ],
      "figure": {
        "kind": "sd",
        "xlabel": "Used cars sold",
        "ylabel": "Price",
        "panels": [
          {
            "caption": "Demand shifts left (large); supply shifts left (small)",
            "demand": {
              "shift": "left",
              "size": "large"
            },
            "supply": {
              "shift": "left",
              "size": "small"
            },
            "result": "Price falls, quantity falls"
          }
        ]
      }
    },
    {
      "id": "m1-q15",
      "theme": "Fixed Supply",
      "source": "In-person Lecture 2: Bitcoin 2030",
      "kind": "conceptual",
      "stem": "In 2024 a sneaker company released exactly 10,000 pairs of a limited-edition shoe and announced it will never produce more. The pairs are traded among collectors on a resale market. In 2026 a celebrity is photographed wearing the shoe and many more people want a pair.",
      "ask": "What does the supply-and-demand model predict for the equilibrium resale price and the equilibrium quantity of pairs in circulation?",
      "choices": [
        "Price rises; quantity rises.",
        "Neither changes, because no new pairs are produced.",
        "Price rises; quantity is unchanged.",
        "Price is unchanged; quantity rises."
      ],
      "correct_index": 2,
      "hints": [
        "Draw the supply curve first. If the total number of pairs is fixed at 10,000 no matter the price, what shape does the supply curve have?",
        "The celebrity photo shifts the demand curve to the right.",
        "Slide the demand curve to the right along a vertical supply curve. The intersection moves straight up."
      ],
      "solution": [
        "With a fixed stock of 10,000 pairs, the supply curve is a vertical line at Q = 10,000: quantity supplied does not respond to price.",
        "A rightward shift in demand along a vertical supply curve raises the equilibrium price while leaving the equilibrium quantity at 10,000.",
        "This is the Bitcoin logic from class: with supply capped at 21 million coins, any growth in demand can only be absorbed by a higher price, which is why the steady-state price has to keep rising if money demand grows every year.",
        "Choice B confuses \"no new production\" with \"no change in price\": a fixed supply is precisely the situation in which price does all the adjusting."
      ],
      "figure": {
        "kind": "sd",
        "xlabel": "Pairs in circulation",
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
            "result": "Price rises, quantity unchanged at 10,000"
          }
        ]
      }
    },
    {
      "id": "m1-q16",
      "theme": "Profit Maximization with Zero Marginal Cost",
      "source": "In-person Lecture 2: Econ-Simulator pricing game; Revenue maximization, graphical approach",
      "kind": "numeric",
      "stem": "Bruin Studio has finished developing a mobile game at a cost of $10,000. Each additional download costs the studio nothing (marginal cost = 0). The demand for the game is P = 100 − 0.1Q, where P is the price in dollars and Q is the number of downloads. The team is choosing among four prices: $25, $50, $75 and $100.",
      "ask": "Which price maximizes the studio's profit?",
      "choices": [
        "$75",
        "$50",
        "$25",
        "$100"
      ],
      "correct_index": 1,
      "hints": [
        "With marginal cost equal to zero, profit = total revenue − $10,000. The $10,000 is the same at every price, so the profit-maximizing price is simply the revenue-maximizing price.",
        "For each candidate price, find Q from the demand curve (Q = (100 − P) / 0.1) and compute revenue = P × Q.",
        "At $25: Q = 750, revenue $18,750. At $50: Q = 500, revenue $25,000. Now do $75 and $100."
      ],
      "solution": [
        "At $25: Q = 750, TR = $18,750. At $50: Q = 500, TR = $25,000. At $75: Q = 250, TR = $18,750. At $100: Q = 0, TR = $0.",
        "Revenue is highest at $50, so profit is highest there too: $25,000 − $10,000 = $15,000. The fixed development cost does not affect which price is best; it only determines whether the project is profitable at all.",
        "Pricing involves a trade-off: a higher price earns more per download but shrinks the number of downloads; a lower price captures more customers but earns less per unit. With a linear demand curve, revenue (the area of the rectangle P × Q under the demand curve) is largest at the midpoint of the demand curve. In the graph, the triangle above the price is consumer surplus and the triangle to the right of Q is the unexploited market (customers who would buy at a lower price).",
        "In Module 2 you will see the calculus shortcut: TR = 100Q − 0.1Q², so MR = 100 − 0.2Q, and MR = MC = 0 gives Q = 500 and P = $50, the same answer."
      ],
      "figure": {
        "kind": "demand-areas",
        "intercept": 100,
        "slope": 0.1,
        "price": 50,
        "xmax": 1000,
        "ymax": 100,
        "xlabel": "Downloads",
        "ylabel": "Price ($)",
        "areas": {
          "revenue": "Revenue = $50 × 500 = $25,000",
          "cs": "Consumer surplus",
          "unexploited": "Unexploited market"
        },
        "compare_prices": [
          {
            "price": 25,
            "label": "Revenue at $25 = $18,750"
          },
          {
            "price": 75,
            "label": "Revenue at $75 = $18,750"
          }
        ],
        "marks": {
          "q": "Q = 500",
          "p": "P = $50"
        }
      }
    },
    {
      "id": "m1-q17",
      "theme": "Gender Pay Gap",
      "source": "In-person Lecture 1: The Gender Pay Gap (Bertrand, Goldin & Katz; Kleven et al.; Cullen & Perez-Truglia)",
      "kind": "conceptual",
      "stem": "Class discussed several studies of the gender pay gap, including the careers of Chicago Booth MBA graduates and administrative data on parents in Denmark.",
      "ask": "Which statement best summarizes the evidence discussed in class?",
      "choices": [
        "The gap is largest at the time of hiring and shrinks over the career as women are promoted at higher rates than men.",
        "Fathers experience the same sharp, permanent drop in earnings after the birth of a first child as mothers do.",
        "Most of the gap comes from men and women in the same position at the same company being paid different salaries.",
        "The gap is modest right after graduation and widens over the following 10 to 15 years, arising mainly along the promotion margin and after the birth of a first child, rather than from unequal pay for the same position at the same company."
      ],
      "correct_index": 3,
      "hints": [
        "Recall the Chicago Booth chart comparing male and female MBA graduates: is the gap largest at graduation, or later in the career?",
        "Recall where the gap arises: within the same position and company, pay is similar; the difference is that women are less likely to be promoted (the \"leaky pipeline\").",
        "Recall the Denmark chart: mothers' earnings drop sharply and permanently after the first child; fathers' earnings do not."
      ],
      "solution": [
        "Among Chicago Booth MBAs, the pay gap is relatively small at graduation and grows substantially over the following decade and a half.",
        "The gap arises mostly along the promotion margin: men and women in the same job at the same company earn similar pay, but women are less likely to advance (48% of entry-level employees, 22% of C-suite, 5% of CEOs in McKinsey's 2018 data). Informal socializing with bosses (Cullen & Perez-Truglia, 2018) is one channel.",
        "The Denmark data show a large, permanent motherhood penalty and no comparable fatherhood penalty. Pay transparency laws (Denmark, Canada) and school-schedule reforms (France) have been shown to narrow the gap.",
        "Choices A, B and C each contradict one of these findings."
      ]
    }
  ]
})
