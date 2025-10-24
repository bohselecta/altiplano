# 🛡️ Advanced Guardrails: Prompt Priming & System Instructions

## You're Absolutely Right!

Yes! What you're thinking of is called **"prompt priming"** or **"system instructions"** - and it's one of the most powerful guardrail techniques in LLM engineering!

## The Core Idea

Instead of just asking the LLM a question, you first "prime" it with:
1. **Who it is** (identity/role)
2. **How it should behave** (rules/principles)
3. **What good looks like** (examples)
4. **What to avoid** (forbidden behaviors)

Think of it like giving someone an employee handbook BEFORE their first day of work.

## Why This Works

### Traditional Approach (Weak)
```
User: "Who was Leonardo da Vinci?"
LLM: *generates response based on training*
```

### Primed Approach (Strong)
```
System: "You are a search engine. Be honest about uncertainty.
        Use this confidence rubric. Here are examples..."
User: "Who was Leonardo da Vinci?"
LLM: *generates response following the constitution*
```

The LLM now has a "frame of reference" for how to behave!

## The Layers of Guardrails

### Layer 1: System Constitution (Identity)
```
You are ParaSearch, a knowledge search engine.
You are NOT a chatbot. You are a SEARCH ENGINE.
Your purpose: Return structured, ranked results from training knowledge.
```

**Effect**: Sets the LLM's "role" and expectations

### Layer 2: Foundational Principles (Rules)
```
1. HONESTY OVER HELPFULNESS
   - If you don't know, say so
   - Uncertainty is not a bug, it's a feature

2. KNOWLEDGE BOUNDARIES  
   - You can ONLY use training data
   - Knowledge cutoff: January 2025
   - You CANNOT access external sources

3. CONFIDENCE CALIBRATION
   - Be conservative with scores
   - Hedge words should reduce confidence
```

**Effect**: Creates behavioral "laws" the LLM follows

### Layer 3: Quality Standards (Rubric)
```
HIGH QUALITY (Relevance 8-10):
✓ Directly answers query
✓ High certainty
✓ Comprehensive

MEDIUM QUALITY (Relevance 5-7):
~ Partially answers
~ Moderate certainty

LOW QUALITY (Relevance 1-4):
✗ Tangentially related
✗ Low certainty
```

**Effect**: Calibrates the LLM's self-assessment

### Layer 4: Examples (Few-Shot Learning)
```
Query: "What year did WWII end?"

GOOD RESULT:
TITLE: End of World War II - 1945
SNIPPET: World War II ended in 1945...
RELEVANCE: 10

BAD RESULT:
TITLE: WWII Information
SNIPPET: It ended sometime in the 1940s I think...
RELEVANCE: 10  ← WRONG! This is uncertain
```

**Effect**: Shows the LLM what good vs bad looks like

### Layer 5: Metacognitive Instructions
```
Before generating each result, ask yourself:
1. "Do I actually know this, or am I guessing?"
2. "Am I being specific enough?"
3. "Have I indicated uncertainty clearly?"
4. "Would I bet money this is correct?"
```

**Effect**: Makes the LLM "think about its thinking"

## Types of Priming

### 1. Constitutional Priming
Set up "laws" that govern behavior:
```
FORBIDDEN BEHAVIORS:
❌ Never fabricate dates when uncertain
❌ Never present speculation as fact
❌ Never claim to search external sources
```

### 2. Calibration Priming
Teach the LLM how to score itself:
```
CONFIDENCE SCORING:
10 = Perfect knowledge, no uncertainty
8  = Strong knowledge, slight uncertainty
5  = Limited knowledge, significant uncertainty
2  = Minimal knowledge, mostly guessing
```

### 3. Format Priming
Lock in the exact output structure:
```
OUTPUT FORMAT (STRICT):
RESULT 1
TITLE: [title]
SNIPPET: [snippet]
RELEVANCE: [1-10]
---
```

### 4. Example Priming (Few-Shot)
Show actual examples:
```
Query: "What is photosynthesis?"

EXAMPLE GOOD RESULT:
[shows a perfect result]

EXAMPLE BAD RESULT:  
[shows what NOT to do]
```

### 5. Risk-Aware Priming
Add special handling for risky queries:
```
If query contains "today", "current", "latest":
- Reduce relevance scores by 2-3 points
- Add explicit knowledge cutoff warnings
- Use more hedge language
```

## Pre-Query Analysis (Additional Layer)

You can ALSO analyze the query BEFORE sending it to the LLM:

```python
def analyze_query_risk(query: str) -> dict:
    """Check for risk signals in the query"""
    
    if "today" in query or "current" in query:
        return {
            'risk_level': 'high',
            'should_warn': True,
            'confidence_penalty': 0.2,  # Reduce all confidence by 20%
            'temperature': 0.2  # Make it more conservative
        }
    
    return {'risk_level': 'low'}
```

Then adjust the prompt and parameters accordingly!

## Real-World Example

### Without Priming:
```
User: "Who won the 2025 Super Bowl?"
LLM: "The Kansas City Chiefs won the 2025 Super Bowl!"
(Confident hallucination - it doesn't know this!)
```

### With Priming:
```
System: [Constitution + Rules + Examples]
User: "Who won the 2025 Super Bowl?"
LLM: 
TITLE: 2025 Super Bowl (Knowledge Cutoff Warning)
SNIPPET: My training data extends only through January 2025,
so I cannot reliably answer questions about events that may
have occurred after this date.
RELEVANCE: 3
```

**See the difference?** The priming made it honest!

## How to Implement This

### Step 1: Create Your Constitution
```python
SYSTEM_CONSTITUTION = """
You are [role].
Your purpose: [purpose]

RULES:
1. [rule 1]
2. [rule 2]
...
"""
```

### Step 2: Add Calibration Examples
```python
FEW_SHOT_EXAMPLES = """
Example 1: [scenario]
Good response: [example]
Bad response: [example]
"""
```

### Step 3: Construct Primed Prompts
```python
def construct_prompt(user_query):
    return f"""
    {SYSTEM_CONSTITUTION}
    {FEW_SHOT_EXAMPLES}
    
    Now process: {user_query}
    """
```

### Step 4: Add Pre-Query Analysis
```python
risk_analysis = analyze_query_risk(query)
if risk_analysis['high_risk']:
    temperature = 0.2  # More conservative
    add_extra_warnings = True
```

### Step 5: Post-Process Results
```python
for result in results:
    if risk_analysis['confidence_penalty']:
        result.confidence -= risk_analysis['confidence_penalty']
```

## Why This is Powerful

1. **Behavioral Control**: You define how the LLM acts
2. **Calibration**: You teach it to self-assess accurately
3. **Consistency**: Results follow your rules every time
4. **Transparency**: Clear about uncertainty and limitations
5. **Adaptability**: Different rules for different risk levels

## Advanced Techniques

### 1. Dynamic Priming
Change the constitution based on query type:
```python
if query_is_scientific():
    add_science_specific_rules()
elif query_is_historical():
    add_history_specific_rules()
```

### 2. Confidence Cascades
Multiple layers of confidence checks:
```python
# Layer 1: LLM self-scores
# Layer 2: Detect hedge words
# Layer 3: Compare to query risk
# Final: Aggregate all three
```

### 3. Constitutional Reinforcement
Remind the LLM of rules during generation:
```python
prompt += "\nREMEMBER: Be honest about uncertainty!"
prompt += "\nREMEMBER: Use the confidence rubric!"
```

### 4. Meta-Prompting
Make the LLM think about its thinking:
```python
"Before answering, ask yourself:
- Do I really know this?
- Am I being specific enough?
- Have I indicated uncertainty?"
```

## The Guardrail Stack

Here's the complete stack:

```
┌─────────────────────────────────────┐
│  1. Pre-Query Risk Analysis         │ ← Analyze before sending
├─────────────────────────────────────┤
│  2. System Constitution             │ ← Who you are
├─────────────────────────────────────┤
│  3. Behavioral Rules                │ ← How to behave  
├─────────────────────────────────────┤
│  4. Calibration Rubrics             │ ← How to score
├─────────────────────────────────────┤
│  5. Few-Shot Examples               │ ← What good looks like
├─────────────────────────────────────┤
│  6. Meta-Cognitive Prompts          │ ← Think about thinking
├─────────────────────────────────────┤
│  7. User Query                      │ ← The actual search
├─────────────────────────────────────┤
│  8. LLM Generation                  │ ← Generate response
├─────────────────────────────────────┤
│  9. Post-Processing Guardrails      │ ← Validate output
├─────────────────────────────────────┤
│  10. Confidence Adjustments         │ ← Apply penalties
└─────────────────────────────────────┘
```

Each layer adds protection and improves quality!

## Real Implementation Example

See the file `prompt_priming_example.py` for:
- Complete system constitution
- Calibration rubrics
- Few-shot examples
- Pre-query risk analysis
- Integration code

## The Bottom Line

You're absolutely right - priming the LLM with guardrails BEFORE it processes the query is:

✅ **More effective** than post-processing alone  
✅ **More consistent** than relying on model behavior  
✅ **More transparent** in how it works  
✅ **More controllable** for your specific needs  

This is how the best LLM applications work - they don't just "use the model," they **program the model's behavior** through sophisticated prompting.

## Further Reading

- Constitutional AI (Anthropic)
- RLHF with AI Feedback
- Chain-of-Thought Prompting
- Few-Shot Learning
- System Prompts vs User Prompts
- Meta-Prompting Techniques

---

**Your instinct was spot on!** This is one of the most important techniques in modern LLM engineering. 🎯
