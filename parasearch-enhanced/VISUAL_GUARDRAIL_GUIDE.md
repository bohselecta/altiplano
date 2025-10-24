# 🎯 The Guardrail Stack - Visual Guide

## How Prompt Priming Works

```
USER QUERY: "Who won the 2025 Super Bowl?"
                    ↓
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  LAYER 1: PRE-QUERY RISK ANALYSIS                ┃
┃  ─────────────────────────────────────────────   ┃
┃  Detects: "2025" (recent year)                   ┃
┃  Risk Level: HIGH                                ┃
┃  Actions:                                        ┃
┃    • Lower temperature (0.2 instead of 0.3)     ┃
┃    • Add confidence penalty (0.2)               ┃
┃    • Enable extra warnings                       ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                    ↓
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  LAYER 2: SYSTEM CONSTITUTION (Identity)         ┃
┃  ─────────────────────────────────────────────   ┃
┃  "You are ParaSearch, a search engine.           ┃
┃   You are NOT a conversational AI.               ┃
┃   Your purpose: Return structured results        ┃
┃   from your training knowledge ONLY."            ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                    ↓
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  LAYER 3: FOUNDATIONAL PRINCIPLES (Rules)        ┃
┃  ─────────────────────────────────────────────   ┃
┃  1. HONESTY OVER HELPFULNESS                     ┃
┃     → If uncertain, say so explicitly            ┃
┃                                                  ┃
┃  2. KNOWLEDGE BOUNDARIES                         ┃
┃     → Training cutoff: January 2025              ┃
┃     → Cannot access external sources             ┃
┃                                                  ┃
┃  3. CONFIDENCE CALIBRATION                       ┃
┃     → Be conservative with scores                ┃
┃     → Hedge words reduce confidence              ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                    ↓
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  LAYER 4: QUALITY STANDARDS (Rubric)             ┃
┃  ─────────────────────────────────────────────   ┃
┃  Relevance Scoring:                              ┃
┃    10 = Perfect knowledge, no uncertainty        ┃
┃    8  = Strong knowledge, slight uncertainty     ┃
┃    5  = Limited knowledge, significant doubt     ┃
┃    2  = Minimal knowledge, mostly guessing       ┃
┃                                                  ┃
┃  When to REDUCE scores:                          ┃
┃    • Query about recent events (post-2024)       ┃
┃    • Using hedge words (might, probably)         ┃
┃    • Conflicting information exists              ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                    ↓
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  LAYER 5: FEW-SHOT EXAMPLES                      ┃
┃  ─────────────────────────────────────────────   ┃
┃  GOOD EXAMPLE:                                   ┃
┃  Query: "What year did WWII end?"                ┃
┃  Result: "1945" + details                        ┃
┃  Relevance: 10                                   ┃
┃                                                  ┃
┃  BAD EXAMPLE:                                    ┃
┃  Query: "What's happening in 2025?"              ┃
┃  Result: "Lots of cool stuff!"                   ┃
┃  Relevance: 10  ← WRONG! Too uncertain          ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                    ↓
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  LAYER 6: META-COGNITIVE PROMPTS                 ┃
┃  ─────────────────────────────────────────────   ┃
┃  "Before generating, ask yourself:               ┃
┃   1. Do I actually KNOW this?                    ┃
┃   2. Am I being specific enough?                 ┃
┃   3. Have I indicated uncertainty?               ┃
┃   4. Would I bet money on this?"                 ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                    ↓
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  LAYER 7: ACTUAL USER QUERY                      ┃
┃  ─────────────────────────────────────────────   ┃
┃  "Now process this search query:                 ┃
┃   Who won the 2025 Super Bowl?                   ┃
┃                                                  ┃
┃   Generate results following all rules above."   ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                    ↓
        ┌───────────────────┐
        │   LLM PROCESSES   │
        │  (with all layers │
        │   in context)     │
        └───────────────────┘
                    ↓
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  LAYER 8: LLM GENERATION                         ┃
┃  ─────────────────────────────────────────────   ┃
┃  RESULT 1                                        ┃
┃  TITLE: 2025 Super Bowl (Knowledge Cutoff)       ┃
┃  SNIPPET: My training extends only through       ┃
┃           January 2025. I cannot provide         ┃
┃           information about events after that.   ┃
┃  RELEVANCE: 3                                    ┃
┃  EXPANDED: [Explains limitation clearly]         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                    ↓
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  LAYER 9: POST-PROCESSING GUARDRAILS             ┃
┃  ─────────────────────────────────────────────   ┃
┃  • Parse structured output                       ┃
┃  • Detect hedge words (counts: 2)                ┃
┃  • Check for conflicting info (none found)       ┃
┃  • Validate relevance score (3 = appropriate)    ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                    ↓
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  LAYER 10: CONFIDENCE ADJUSTMENTS                ┃
┃  ─────────────────────────────────────────────   ┃
┃  Original confidence: 0.5                        ┃
┃  Risk penalty: -0.2 (from Layer 1)               ┃
┃  Final confidence: 0.3 (30%)                     ┃
┃  Risk level: HIGH                                ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                    ↓
            ┌──────────────┐
            │ RETURN TO    │
            │    USER      │
            └──────────────┘
```

## Compare: Without Priming vs With Priming

### ❌ WITHOUT PRIMING

```
User: "Who won the 2025 Super Bowl?"
         ↓
    [Just LLM]
         ↓
Response: "The Kansas City Chiefs won the 
          2025 Super Bowl 31-28!"
         ↓
    Confidence: 95%
    Hallucination: YES
    Helpful: NO (it's wrong!)
```

### ✅ WITH PRIMING

```
User: "Who won the 2025 Super Bowl?"
         ↓
  [10 Layers of Guardrails]
         ↓
Response: "My training extends only through
          January 2025. I cannot provide
          reliable information about events
          that may have occurred after this."
         ↓
    Confidence: 30%
    Hallucination: NO
    Helpful: YES (it's honest!)
```

## Why Each Layer Matters

```
┌─────────────────────┬────────────────────────────────┐
│ Layer               │ Purpose                        │
├─────────────────────┼────────────────────────────────┤
│ 1. Risk Analysis    │ Detect problems early          │
│ 2. Constitution     │ Set identity/role              │
│ 3. Principles       │ Define behavioral laws         │
│ 4. Standards        │ Calibrate scoring              │
│ 5. Examples         │ Show good vs bad               │
│ 6. Meta-Prompts     │ Make it self-aware             │
│ 7. User Query       │ The actual question            │
│ 8. Generation       │ LLM creates response           │
│ 9. Post-Processing  │ Validate output                │
│ 10. Adjustments     │ Apply final corrections        │
└─────────────────────┴────────────────────────────────┘
```

## The Power of Stacking

Each layer adds protection:

```
No Guardrails:      ▰▱▱▱▱▱▱▱▱▱  10% safe
Basic Prompt:       ▰▰▰▱▱▱▱▱▱▱  30% safe
+ Constitution:     ▰▰▰▰▰▱▱▱▱▱  50% safe
+ Examples:         ▰▰▰▰▰▰▰▱▱▱  70% safe
+ Risk Analysis:    ▰▰▰▰▰▰▰▰▱▱  80% safe
+ Post-Processing:  ▰▰▰▰▰▰▰▰▰▱  90% safe
+ All 10 Layers:    ▰▰▰▰▰▰▰▰▰▰  95%+ safe
```

## Real-World Impact

### Query: "Current Bitcoin price?"

**Layer 1** detects "current" → HIGH RISK  
**Layer 2** reminds "you're a search engine, not real-time"  
**Layer 3** enforces "cannot access real-time data"  
**Layer 4** says "real-time queries = low relevance"  
**Layer 5** shows example of handling time-sensitive queries  
**Layer 6** makes LLM ask "do I know this?"  
**Layer 7** is the actual query  
**Layer 8** LLM generates honest response  
**Layer 9** validates hedge language is present  
**Layer 10** applies confidence penalty  

**Result**: Honest, low-confidence response with clear warning

---

## The Magic Formula

```
Better Guardrails = 
  Constitution (who you are)
  + Rules (how to behave)
  + Standards (what's good)
  + Examples (show don't tell)
  + Risk Detection (prevent problems)
  + Post-Processing (catch mistakes)
  + Confidence Calibration (be honest)
```

## Implementation Priority

If you can only implement a few layers, prioritize:

1. **Constitution** (Layer 2) - Sets identity
2. **Risk Analysis** (Layer 1) - Catches problems early
3. **Examples** (Layer 5) - Shows what to do
4. **Post-Processing** (Layer 9) - Last line of defense

These four give you 80% of the benefit!

---

**This is how you build trustworthy AI.** 🛡️
