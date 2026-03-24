import { Condition } from "@/lib/types";

export const conditions: Condition[] = [
  /* ==========================================================================
     MOOD & DEPRESSION
     ========================================================================== */
  {
    slug: "depression",
    name: "Depression",
    category: "mood",
    shortDescription:
      "Persistent low mood, loss of interest, and emotional heaviness that interferes with daily life and functioning.",
    longDescription: `Depression is far more than simply feeling sad. It is a clinical condition characterised by persistent low mood, a loss of interest or pleasure in activities that were once enjoyable, and a pervasive sense of emotional heaviness that can affect every aspect of daily life. People experiencing depression often describe feeling as though a weight is pressing down on them, making even routine tasks feel overwhelming.

The causes of depression are multifaceted and may include genetic predisposition, neurochemical imbalances, chronic stress, trauma, significant life changes, medical conditions, and social isolation. Depression does not discriminate — it affects people of all ages, backgrounds, and life circumstances. It is one of the most common mental health conditions in Australia, with approximately one in seven Australians experiencing depression during their lifetime.

Left untreated, depression can have a profound impact on relationships, work performance, physical health, and overall quality of life. However, depression is highly treatable. Evidence-based psychological therapies, sometimes in combination with medication, have been shown to significantly reduce symptoms and help individuals rebuild a meaningful and fulfilling life.`,
    symptoms: [
      "Persistent feelings of sadness, emptiness, or hopelessness",
      "Loss of interest or pleasure in previously enjoyed activities",
      "Significant changes in appetite or weight",
      "Sleep disturbance — insomnia or sleeping excessively",
      "Fatigue, low energy, or feeling physically slowed down",
      "Difficulty concentrating, making decisions, or remembering things",
      "Feelings of worthlessness or excessive guilt",
      "Withdrawal from social activities and relationships",
    ],
    howTherapyHelps:
      "Therapy for depression focuses on identifying and challenging negative thought patterns, rebuilding engagement with meaningful activities, and developing practical coping strategies. Cognitive Behavioural Therapy (CBT) helps you recognise and restructure unhelpful thinking, while Behavioural Activation systematically reintroduces rewarding activities into your life. Acceptance and Commitment Therapy (ACT) supports you in building psychological flexibility and reconnecting with your values, even in the presence of difficult emotions. Your psychologist will tailor the approach to your unique circumstances, providing a safe and supportive space to explore the underlying factors contributing to your depression and build lasting resilience.",
    recommendedApproaches: ["CBT", "ACT", "Behavioural Activation", "Psychodynamic Therapy", "Mindfulness-Based Cognitive Therapy"],
    relatedServices: ["individual-therapy", "group-therapy"],
    icon: "CloudRain",
  },
  {
    slug: "bipolar-disorder",
    name: "Bipolar Disorder",
    category: "mood",
    shortDescription:
      "Cycling between periods of elevated mood (mania or hypomania) and depressive episodes that disrupt stability.",
    longDescription: `Bipolar disorder is a mood condition characterised by significant shifts between periods of elevated, expansive, or irritable mood (known as mania or hypomania) and periods of depression. These mood episodes go beyond normal fluctuations and can profoundly affect energy levels, sleep, thinking, behaviour, and the ability to carry out day-to-day tasks.

During manic or hypomanic episodes, individuals may feel unusually energised, confident, or creative, but may also engage in impulsive or risky behaviours. Depressive episodes mirror the symptoms of clinical depression, with persistent low mood, fatigue, and withdrawal. Some people experience mixed states where features of both mania and depression occur simultaneously.

Living with bipolar disorder can be challenging, but with the right combination of psychological therapy and psychiatric medication management, most people achieve significant stability. Therapy plays a critical role in helping individuals recognise early warning signs of mood episodes, develop robust self-management strategies, maintain consistent routines, and build supportive relationships that contribute to long-term wellbeing.`,
    symptoms: [
      "Distinct periods of unusually elevated, expansive, or irritable mood",
      "Reduced need for sleep without feeling tired",
      "Racing thoughts, rapid speech, or increased goal-directed activity",
      "Impulsive behaviour such as excessive spending or risky decisions",
      "Episodes of deep depression alternating with elevated mood",
      "Difficulty maintaining consistent routines and relationships",
      "Fluctuating energy levels that feel beyond personal control",
    ],
    howTherapyHelps:
      "Psychological therapy for bipolar disorder focuses on psychoeducation about the condition, mood monitoring, early identification of mood episode triggers, and the development of structured daily routines that promote stability. CBT helps address unhelpful thought patterns during both depressive and manic phases, while interpersonal and social rhythm therapy focuses on stabilising daily routines and sleep. Therapy also supports medication adherence and works alongside psychiatry to create a comprehensive treatment plan.",
    recommendedApproaches: ["CBT", "Psychoeducation", "Interpersonal Therapy", "ACT", "Mindfulness-Based Therapy"],
    relatedServices: ["individual-therapy"],
    icon: "Activity",
  },
  {
    slug: "seasonal-affective-disorder",
    name: "Seasonal Affective Disorder",
    category: "mood",
    shortDescription:
      "Depressive episodes that follow a seasonal pattern, typically worsening during autumn and winter months.",
    longDescription: `Seasonal Affective Disorder (SAD) is a form of depression that follows a predictable seasonal pattern, most commonly beginning in autumn and intensifying through winter before improving in spring. While it is less commonly discussed in Australia than in Northern Hemisphere countries, it does affect Australians, particularly those living in southern states where daylight hours are significantly reduced during winter.

The condition is thought to be linked to reduced exposure to sunlight, which can disrupt the body's circadian rhythm, lower serotonin levels, and increase melatonin production. People with SAD often experience symptoms that overlap with major depression, including persistent low mood, increased sleep, weight gain, social withdrawal, and difficulty concentrating.

SAD is a recognised clinical condition that responds well to targeted interventions. Therapy can help individuals develop proactive strategies for managing symptoms before they escalate, establish routines that maximise light exposure and physical activity, and address the cognitive patterns that can maintain and deepen seasonal depression.`,
    symptoms: [
      "Low mood that consistently worsens during specific seasons",
      "Increased sleepiness and difficulty waking in the morning",
      "Cravings for carbohydrates and weight gain",
      "Social withdrawal and loss of interest in activities",
      "Difficulty concentrating and reduced productivity",
      "Feelings of hopelessness or irritability during darker months",
    ],
    howTherapyHelps:
      "Therapy for SAD combines CBT techniques adapted specifically for seasonal depression with behavioural strategies to increase physical activity, light exposure, and social engagement during vulnerable months. Your psychologist will help you develop a personalised seasonal action plan, challenge patterns of avoidance and withdrawal, and build routines that protect your mental health year-round.",
    recommendedApproaches: ["CBT", "Behavioural Activation", "Light Therapy Support", "ACT"],
    relatedServices: ["individual-therapy"],
    icon: "Sun",
  },
  {
    slug: "persistent-depressive-disorder",
    name: "Persistent Depressive Disorder",
    category: "mood",
    shortDescription:
      "A chronic, lower-grade form of depression lasting two years or more that erodes quality of life over time.",
    longDescription: `Persistent Depressive Disorder (previously known as dysthymia) is a form of chronic depression where symptoms persist for two years or more. While the symptoms may be less intense than those of major depressive disorder, their chronic nature can be equally — if not more — debilitating over time, as individuals often come to accept their depressed state as simply part of who they are.

People with persistent depressive disorder frequently describe feeling as though they have always been this way. They may function at work and in relationships, but with a constant undercurrent of sadness, fatigue, low self-esteem, and difficulty experiencing genuine pleasure. Because the condition develops gradually and persists for so long, many people do not seek help, believing that their experience is normal.

The good news is that persistent depressive disorder responds well to psychological treatment. Therapy can help individuals recognise that their chronic low mood is not a permanent personality trait but a treatable condition, and can support them in building a life that feels genuinely fulfilling rather than merely endurable.`,
    symptoms: [
      "Low mood on most days for two years or more",
      "Low energy and persistent fatigue",
      "Poor self-esteem and feelings of inadequacy",
      "Difficulty making decisions or concentrating",
      "Feelings of hopelessness about the future",
      "Tendency to withdraw from social engagement",
      "Disrupted sleep patterns — too much or too little",
    ],
    howTherapyHelps:
      "Therapy for persistent depressive disorder uses a combination of CBT to identify and challenge deeply held negative beliefs, behavioural activation to rebuild engagement with meaningful activities, and schema therapy to address long-standing patterns that may have developed in response to early life experiences. The therapeutic relationship itself often becomes a powerful vehicle for change, as many clients with chronic depression have learned to expect little from others.",
    recommendedApproaches: ["CBT", "Schema Therapy", "Behavioural Activation", "ACT", "Psychodynamic Therapy"],
    relatedServices: ["individual-therapy"],
    icon: "CloudDrizzle",
  },
  {
    slug: "perinatal-postnatal-depression",
    name: "Perinatal & Postnatal Depression",
    category: "mood",
    shortDescription:
      "Depression occurring during pregnancy or after birth, affecting bonding, daily functioning, and wellbeing.",
    longDescription: `Perinatal depression encompasses depressive episodes that occur during pregnancy (antenatal depression) or in the first year following birth (postnatal depression). It affects approximately one in five Australian women and one in ten Australian men, making it one of the most common complications of the perinatal period. Despite its prevalence, perinatal depression is frequently under-recognised and under-treated due to stigma and the normalisation of distress during this life stage.

Perinatal depression goes beyond the typical adjustment challenges of new parenthood. It involves persistent low mood, anxiety, difficulty bonding with the baby, overwhelming fatigue that is disproportionate to sleep loss, feelings of inadequacy as a parent, and sometimes intrusive thoughts about harm coming to the baby. These symptoms can significantly affect the parent-infant relationship, the partner relationship, and the broader family system.

Early intervention is critical. Untreated perinatal depression can have lasting effects on both parent and child wellbeing. Psychological therapy delivered via telehealth is particularly valuable during this period, as it removes barriers to access for parents who may find it difficult to attend in-person appointments with a newborn.`,
    symptoms: [
      "Persistent sadness, tearfulness, or emotional numbness",
      "Difficulty bonding with or feeling connected to the baby",
      "Overwhelming anxiety about the baby's health or safety",
      "Intense feelings of guilt, shame, or inadequacy as a parent",
      "Loss of interest in activities and withdrawal from support networks",
      "Changes in appetite, sleep disturbance beyond normal newborn wake-ups",
      "Intrusive or frightening thoughts about harm to self or baby",
      "Irritability or anger that feels disproportionate",
    ],
    howTherapyHelps:
      "Therapy for perinatal depression is sensitive to the unique demands of new parenthood. Treatment may include CBT to address anxious and depressive thinking patterns, ACT to help parents navigate the gap between expectations and reality, and attachment-focused interventions to support the parent-infant bond. Telehealth delivery makes it possible to access support during nap times or from the comfort of home, removing a significant barrier for new parents.",
    recommendedApproaches: ["CBT", "ACT", "Attachment-Based Therapy", "Compassion-Focused Therapy"],
    relatedServices: ["individual-therapy"],
    icon: "Baby",
  },

  /* ==========================================================================
     ANXIETY & STRESS
     ========================================================================== */
  {
    slug: "generalised-anxiety",
    name: "Generalised Anxiety Disorder",
    category: "anxiety",
    shortDescription:
      "Persistent, excessive worry about everyday matters that is difficult to control and causes significant distress.",
    longDescription: `Generalised Anxiety Disorder (GAD) is characterised by persistent, excessive, and difficult-to-control worry about a wide range of everyday concerns — work, health, finances, family, and even minor matters. Unlike the normal worry that everyone experiences from time to time, GAD involves a level of apprehension that is disproportionate to the actual likelihood or impact of the feared outcomes and persists for six months or more.

People with GAD often describe their mind as being constantly on alert, scanning for potential problems and anticipating worst-case scenarios. This chronic state of hypervigilance takes a significant toll on physical health, commonly manifesting as muscle tension, headaches, digestive problems, fatigue, and sleep disturbance. Many people with GAD have experienced anxiety for so long that they believe it is simply part of their personality.

GAD is one of the most responsive anxiety conditions to psychological treatment. Evidence-based therapies can help individuals develop a fundamentally different relationship with uncertainty and worry, reducing both the frequency and intensity of anxious episodes and restoring a sense of calm and agency in daily life.`,
    symptoms: [
      "Persistent, excessive worry about multiple areas of life",
      "Difficulty controlling or stopping worried thoughts",
      "Feeling restless, on edge, or keyed up",
      "Muscle tension, headaches, or jaw clenching",
      "Fatigue and difficulty concentrating",
      "Sleep disturbance — difficulty falling or staying asleep",
      "Irritability and feeling easily overwhelmed",
      "Physical symptoms such as nausea or digestive discomfort",
    ],
    howTherapyHelps:
      "Therapy for GAD helps you understand the mechanisms that maintain chronic worry and develops practical strategies to break the cycle. CBT targets the overestimation of threat and intolerance of uncertainty that drive excessive worry, while ACT focuses on building psychological flexibility — the ability to be present with difficult thoughts without being controlled by them. Your psychologist will also teach relaxation and grounding techniques to manage the physical symptoms of anxiety.",
    recommendedApproaches: ["CBT", "ACT", "Mindfulness-Based Therapy", "Relaxation Training"],
    relatedServices: ["individual-therapy", "group-therapy"],
    icon: "Wind",
  },
  {
    slug: "social-anxiety",
    name: "Social Anxiety Disorder",
    category: "anxiety",
    shortDescription:
      "Intense fear of social situations driven by worry about being judged, embarrassed, or negatively evaluated.",
    longDescription: `Social Anxiety Disorder (also known as social phobia) involves an intense and persistent fear of social situations where one might be scrutinised, judged, or negatively evaluated by others. This goes far beyond shyness — it is a clinical condition that can severely restrict a person's personal, professional, and social life.

People with social anxiety may avoid or endure with great distress situations such as meetings, public speaking, social gatherings, dating, eating in front of others, or even everyday interactions like making phone calls or speaking to shop assistants. The fear is often accompanied by physical symptoms including blushing, sweating, trembling, nausea, and mind blanks, which the person then worries will be noticed by others, creating a self-reinforcing cycle.

Social anxiety typically develops in adolescence and, without treatment, tends to persist into adulthood. It is often associated with significant under-achievement relative to a person's ability, as career advancement, relationship formation, and social participation are all constrained. Evidence-based therapy offers an effective pathway to recovery, with most people experiencing meaningful improvement within 12 to 16 sessions.`,
    symptoms: [
      "Intense fear of being judged or negatively evaluated in social situations",
      "Avoidance of social interactions, meetings, or public speaking",
      "Physical symptoms in social settings — blushing, sweating, trembling",
      "Excessive self-consciousness and post-event rumination",
      "Difficulty making eye contact or speaking up in groups",
      "Fear of being the centre of attention",
      "Reliance on safety behaviours such as over-preparation or alcohol use",
    ],
    howTherapyHelps:
      "CBT for social anxiety is one of the most effective psychological treatments available. It involves identifying and challenging the negative predictions and self-focused beliefs that drive social fear, gradually reducing avoidance through structured exposure exercises, and dropping safety behaviours that inadvertently maintain anxiety. Group therapy for social anxiety provides a uniquely powerful therapeutic environment where participants can practise new behaviours with peer support.",
    recommendedApproaches: ["CBT", "Exposure Therapy", "ACT", "Social Skills Training"],
    relatedServices: ["individual-therapy", "group-therapy"],
    icon: "Users",
  },
  {
    slug: "panic-disorder",
    name: "Panic Disorder",
    category: "anxiety",
    shortDescription:
      "Recurrent, unexpected panic attacks accompanied by ongoing fear of future attacks and avoidance behaviour.",
    longDescription: `Panic Disorder is characterised by recurrent, unexpected panic attacks — sudden surges of intense fear or discomfort that reach a peak within minutes. During a panic attack, individuals may experience a racing heart, shortness of breath, chest pain, dizziness, numbness, sweating, and a terrifying sense that they are losing control, having a heart attack, or dying.

The condition extends beyond the attacks themselves. People with panic disorder develop a persistent fear of having future attacks and often significantly modify their behaviour to avoid situations where attacks have occurred or where escape might be difficult. This anticipatory anxiety and avoidance can progressively narrow a person's world, sometimes developing into agoraphobia — avoidance of places or situations from which escape might be difficult or embarrassing.

Panic disorder is extremely well-understood from a psychological perspective, and CBT for panic has some of the strongest evidence of any psychological treatment. Most people experience a significant reduction in panic attacks within 8 to 12 sessions, and many become completely panic-free with continued practice of the skills learned in therapy.`,
    symptoms: [
      "Sudden episodes of intense fear with rapid heartbeat and shortness of breath",
      "Chest pain, dizziness, or feeling faint during attacks",
      "Feeling of choking, numbness, or tingling sensations",
      "Fear of losing control, going crazy, or dying during an attack",
      "Persistent worry about when the next attack will occur",
      "Avoidance of places or situations associated with past attacks",
      "Physical tension and hypervigilance to bodily sensations",
    ],
    howTherapyHelps:
      "CBT for panic disorder is highly effective and involves psychoeducation about the fight-or-flight response, cognitive restructuring of catastrophic misinterpretations of bodily sensations, and carefully graded interoceptive exposure — deliberate practice with the physical sensations of panic in a safe therapeutic context. This approach helps your brain learn that panic sensations, while uncomfortable, are not dangerous, breaking the fear-of-fear cycle that maintains the disorder.",
    recommendedApproaches: ["CBT", "Interoceptive Exposure", "ACT", "Relaxation Training"],
    relatedServices: ["individual-therapy"],
    icon: "Zap",
  },
  {
    slug: "health-anxiety",
    name: "Health Anxiety",
    category: "anxiety",
    shortDescription:
      "Excessive preoccupation with having or developing a serious illness, often despite medical reassurance.",
    longDescription: `Health anxiety (sometimes referred to as illness anxiety or hypochondria) involves excessive and persistent worry about having or developing a serious medical condition. People with health anxiety often misinterpret normal bodily sensations as signs of severe illness, engage in repeated body checking or medical Googling, seek frequent medical reassurance, or alternatively avoid medical appointments entirely out of fear of receiving bad news.

While it is normal to occasionally worry about health, health anxiety is distinguished by the degree to which these concerns dominate a person's thoughts and behaviours, causing significant distress and functional impairment. Paradoxically, the very behaviours intended to reduce anxiety — such as seeking reassurance or researching symptoms online — tend to increase it, creating a self-perpetuating cycle.

Health anxiety has become increasingly prevalent in the post-pandemic era and responds very well to targeted psychological treatment. Therapy helps individuals develop a more balanced relationship with health-related uncertainty and reduces the compulsive behaviours that maintain the anxiety cycle.`,
    symptoms: [
      "Persistent preoccupation with having or developing a serious illness",
      "Frequent body checking or monitoring of physical sensations",
      "Excessive Googling of symptoms and medical information",
      "Seeking repeated medical reassurance or tests",
      "Misinterpreting normal bodily sensations as signs of illness",
      "Significant distress and difficulty dismissing health-related thoughts",
    ],
    howTherapyHelps:
      "CBT for health anxiety focuses on understanding the maintenance cycle of health worry, reducing reassurance-seeking and checking behaviours, and developing a more balanced interpretation of bodily sensations. Therapy helps you build tolerance for health-related uncertainty and reclaim the mental energy currently consumed by worry.",
    recommendedApproaches: ["CBT", "ACT", "Exposure and Response Prevention", "Mindfulness-Based Therapy"],
    relatedServices: ["individual-therapy"],
    icon: "HeartPulse",
  },
  {
    slug: "ocd",
    name: "Obsessive-Compulsive Disorder",
    category: "anxiety",
    shortDescription:
      "Intrusive, unwanted thoughts (obsessions) and repetitive behaviours or mental acts (compulsions) performed to reduce distress.",
    longDescription: `Obsessive-Compulsive Disorder (OCD) is a condition characterised by two core features: obsessions — intrusive, unwanted thoughts, images, or urges that cause significant anxiety or distress — and compulsions — repetitive behaviours or mental acts performed to neutralise the distress caused by the obsessions. Common themes include contamination, harm, symmetry, moral or religious scrupulosity, and relationship uncertainty.

OCD is often profoundly misunderstood. It is not simply a preference for tidiness or orderliness. The obsessions in OCD are experienced as deeply distressing, and the compulsions are not enjoyed but performed under duress to prevent feared outcomes. The condition can consume hours of each day and significantly impair work, relationships, and quality of life.

OCD is one of the most treatable anxiety-related conditions through psychological therapy. Exposure and Response Prevention (ERP), a specialised form of CBT, is considered the gold-standard treatment, with approximately 60-80% of people experiencing significant improvement. Therapy helps individuals break free from the cycle of obsession and compulsion and regain control of their lives.`,
    symptoms: [
      "Recurrent intrusive thoughts, images, or urges that cause distress",
      "Repetitive behaviours such as checking, washing, counting, or ordering",
      "Mental rituals such as repeating phrases or reviewing past events",
      "Time-consuming rituals that interfere with daily life",
      "Avoidance of situations that trigger obsessive thoughts",
      "Temporary relief after performing compulsions, followed by return of anxiety",
    ],
    howTherapyHelps:
      "Exposure and Response Prevention (ERP) is the gold-standard treatment for OCD. It involves gradually confronting feared situations while resisting the urge to perform compulsions, allowing the brain to learn that the feared outcomes do not occur and that anxiety naturally reduces without ritualising. Your psychologist will develop a carefully graded exposure hierarchy tailored to your specific OCD presentation and support you through each step.",
    recommendedApproaches: ["ERP", "CBT", "ACT", "Mindfulness-Based Therapy"],
    relatedServices: ["individual-therapy"],
    icon: "RotateCcw",
  },
  {
    slug: "phobias",
    name: "Specific Phobias",
    category: "anxiety",
    shortDescription:
      "Intense, irrational fear of a specific object or situation that leads to avoidance and significant life restriction.",
    longDescription: `Specific phobias are among the most common anxiety disorders and involve an intense, persistent, and irrational fear of a particular object, situation, or activity. Common phobias include fear of flying, heights, needles, blood, animals (such as spiders or dogs), enclosed spaces, vomiting, and medical or dental procedures.

While the feared stimulus may pose little or no actual danger, the fear response is genuine and overwhelming. People with phobias typically engage in extensive avoidance behaviour, which can significantly restrict their personal and professional lives. For example, a fear of flying may prevent career advancement or family visits, while a needle phobia may lead to avoidance of necessary medical care.

Specific phobias respond extremely well to psychological treatment, particularly exposure-based therapy. Many people experience significant improvement in as few as four to six sessions. The key mechanism of change is helping the brain update its threat assessment through carefully structured, gradual exposure to the feared stimulus.`,
    symptoms: [
      "Immediate intense anxiety or panic when encountering the feared stimulus",
      "Active avoidance of the feared object or situation",
      "Anticipatory anxiety in the lead-up to potential exposure",
      "Physical symptoms including rapid heart rate, sweating, and nausea",
      "Recognition that the fear is disproportionate but inability to control it",
      "Life restriction due to avoidance behaviour",
    ],
    howTherapyHelps:
      "Exposure therapy for phobias involves gradually and systematically approaching the feared stimulus in a supported, controlled way. This process allows the brain to learn that the feared object or situation is not genuinely dangerous, naturally reducing the fear response. Telehealth is well-suited for many phobia treatments, as virtual exposure can be incorporated into sessions and in-vivo exposure can be guided remotely.",
    recommendedApproaches: ["Exposure Therapy", "CBT", "Virtual Reality Exposure", "Applied Relaxation"],
    relatedServices: ["individual-therapy"],
    icon: "AlertTriangle",
  },
  {
    slug: "stress-management",
    name: "Stress Management",
    category: "anxiety",
    shortDescription:
      "Chronic stress that overwhelms coping capacity, affecting physical health, mental clarity, and relationships.",
    longDescription: `While some level of stress is a normal and even adaptive part of life, chronic or overwhelming stress can have serious consequences for physical health, mental wellbeing, relationships, and work performance. When the demands placed on a person consistently exceed their perceived capacity to cope, the stress response becomes sustained, leading to a cascade of psychological and physiological effects.

Chronic stress can manifest as persistent tension, difficulty sleeping, irritability, poor concentration, emotional exhaustion, and a sense of being constantly overwhelmed. Over time, it is associated with increased risk of anxiety disorders, depression, cardiovascular disease, immune dysfunction, and burnout. Common sources of chronic stress include work pressure, financial strain, caregiving responsibilities, relationship conflict, and major life transitions.

Stress management is not simply about relaxation techniques — though these play a role. Effective stress management involves identifying the sources and patterns of stress, building robust coping strategies, setting sustainable boundaries, and developing the psychological flexibility to respond to demands with clarity rather than reactivity.`,
    symptoms: [
      "Feeling constantly overwhelmed or unable to cope",
      "Persistent muscle tension, headaches, or physical discomfort",
      "Difficulty sleeping or feeling unrested despite sleep",
      "Irritability, short temper, or emotional reactivity",
      "Difficulty concentrating or making decisions",
      "Withdrawal from activities or relationships",
      "Reliance on unhealthy coping strategies such as alcohol or overeating",
    ],
    howTherapyHelps:
      "Therapy for stress management provides a structured framework for understanding your stress patterns, identifying unhelpful coping strategies, and building sustainable alternatives. Your psychologist will help you develop skills in boundary-setting, cognitive restructuring, mindfulness, and problem-solving, as well as addressing any underlying beliefs about productivity and self-worth that may drive overcommitment.",
    recommendedApproaches: ["CBT", "ACT", "Mindfulness-Based Stress Reduction", "Relaxation Training"],
    relatedServices: ["individual-therapy", "workshops-training"],
    icon: "Gauge",
  },

  /* ==========================================================================
     TRAUMA & PTSD
     ========================================================================== */
  {
    slug: "ptsd",
    name: "Post-Traumatic Stress Disorder",
    category: "trauma",
    shortDescription:
      "A condition that can develop after experiencing or witnessing a traumatic event, causing flashbacks, hypervigilance, and avoidance.",
    longDescription: `Post-Traumatic Stress Disorder (PTSD) can develop after a person experiences, witnesses, or is confronted with a traumatic event involving actual or threatened death, serious injury, or sexual violence. Common precipitating events include accidents, natural disasters, military combat, violent assault, workplace incidents, and sudden bereavement.

PTSD is characterised by four clusters of symptoms: re-experiencing (flashbacks, nightmares, intrusive memories), avoidance (avoiding reminders of the trauma), negative changes in mood and thinking (emotional numbing, guilt, distorted blame), and hyperarousal (hypervigilance, exaggerated startle response, sleep disturbance, irritability). These symptoms can emerge immediately after the event or may have a delayed onset, sometimes appearing months or years later.

PTSD is one of the most extensively researched mental health conditions, and effective treatments are well-established. Trauma-focused psychological therapies can help the brain process traumatic memories so they no longer trigger the intense emotional and physiological responses associated with the original event.`,
    symptoms: [
      "Intrusive memories, flashbacks, or nightmares about the traumatic event",
      "Intense distress when exposed to reminders of the trauma",
      "Avoidance of thoughts, feelings, places, or people associated with the event",
      "Emotional numbness or feeling detached from others",
      "Hypervigilance and exaggerated startle response",
      "Difficulty sleeping and concentrating",
      "Irritability, anger outbursts, or reckless behaviour",
      "Negative beliefs about oneself or the world",
    ],
    howTherapyHelps:
      "Trauma-focused therapy helps the brain process and integrate traumatic memories so they no longer trigger overwhelming emotional and physiological responses. EMDR uses bilateral stimulation to support memory reprocessing, while Trauma-Focused CBT involves structured exposure to trauma memories combined with cognitive restructuring of trauma-related beliefs. Both approaches have strong evidence and can be delivered effectively via telehealth.",
    recommendedApproaches: ["EMDR", "Trauma-Focused CBT", "Prolonged Exposure", "CPT"],
    relatedServices: ["individual-therapy"],
    icon: "ShieldAlert",
  },
  {
    slug: "complex-ptsd",
    name: "Complex PTSD",
    category: "trauma",
    shortDescription:
      "Resulting from prolonged or repeated trauma, characterised by difficulties with emotion regulation, self-concept, and relationships.",
    longDescription: `Complex PTSD (C-PTSD) develops in response to prolonged, repeated, or inescapable traumatic experiences, particularly those occurring during developmentally sensitive periods such as childhood. Common contexts include ongoing childhood abuse or neglect, domestic violence, prolonged captivity, institutional abuse, and repeated interpersonal trauma.

In addition to the core PTSD symptoms of re-experiencing, avoidance, and hyperarousal, Complex PTSD involves difficulties in three additional domains: affect regulation (difficulty managing emotions, explosive anger or emotional shutdowns), negative self-concept (persistent feelings of shame, worthlessness, and being fundamentally different from others), and disturbed relationships (difficulty trusting, maintaining boundaries, or feeling safe in close relationships).

Treatment for Complex PTSD typically requires a phased approach that prioritises safety and stabilisation before engaging in trauma processing. The therapeutic relationship itself becomes a crucial vehicle for change, providing a corrective relational experience and a secure base from which to explore and process traumatic material.`,
    symptoms: [
      "All symptoms of PTSD plus additional difficulties",
      "Severe difficulty managing emotions — explosive anger or emotional numbness",
      "Persistent feelings of shame, worthlessness, or being damaged",
      "Difficulty trusting others or maintaining stable relationships",
      "Patterns of revictimisation or difficulty recognising unsafe situations",
      "Dissociative episodes or feeling disconnected from your body",
      "Chronic feelings of emptiness or hopelessness",
    ],
    howTherapyHelps:
      "Treatment for Complex PTSD follows a phased approach: first establishing safety and stabilisation, then gradually processing traumatic memories, and finally rebuilding connections and meaning. Schema therapy and EMDR are particularly effective, as they address both the trauma memories and the deeply held negative beliefs about self and others that developed in response to prolonged adversity.",
    recommendedApproaches: ["EMDR", "Schema Therapy", "Trauma-Focused CBT", "Compassion-Focused Therapy", "DBT"],
    relatedServices: ["individual-therapy"],
    icon: "Layers",
  },
  {
    slug: "childhood-trauma",
    name: "Childhood Trauma",
    category: "trauma",
    shortDescription:
      "The lasting psychological impact of adverse experiences during childhood, including abuse, neglect, and household dysfunction.",
    longDescription: `Childhood trauma refers to adverse experiences that occurred during the developmental years and continue to exert a significant influence on psychological wellbeing, relationships, and functioning in adulthood. These experiences may include physical, emotional, or sexual abuse; neglect; parental separation or domestic violence; parental substance abuse or mental illness; bullying; or other forms of adversity during formative years.

Research into Adverse Childhood Experiences (ACEs) has demonstrated a dose-response relationship between the number and severity of childhood adversities and a range of adult outcomes including mental health conditions, chronic physical illness, substance use, and relational difficulties. Importantly, this research also highlights the role of protective factors and the capacity for healing and recovery at any age.

Many adults who experienced childhood trauma have developed survival strategies that served them well as children but now create difficulties in adult life — such as hypervigilance, people-pleasing, emotional suppression, or difficulty trusting others. Therapy provides a safe space to understand these patterns, grieve what was lost, and develop new ways of relating to yourself and others.`,
    symptoms: [
      "Difficulty trusting others or forming secure attachments",
      "Chronic feelings of shame, self-blame, or unworthiness",
      "Emotional dysregulation — intense reactions or emotional numbness",
      "Hypervigilance and difficulty feeling safe",
      "People-pleasing, perfectionism, or difficulty setting boundaries",
      "Dissociation or feeling disconnected from emotions and body",
      "Patterns of self-sabotage in relationships or career",
    ],
    howTherapyHelps:
      "Therapy for childhood trauma provides a safe, non-judgemental space to explore the impact of early adverse experiences on your present-day functioning. Treatment may involve Schema Therapy to identify and modify deeply held patterns, EMDR to process specific traumatic memories, and attachment-focused work to develop more secure relational patterns. The therapeutic relationship itself serves as a model for safe, boundaried connection.",
    recommendedApproaches: ["Schema Therapy", "EMDR", "Psychodynamic Therapy", "Attachment-Based Therapy", "Compassion-Focused Therapy"],
    relatedServices: ["individual-therapy"],
    icon: "Heart",
  },
  {
    slug: "sexual-abuse-assault",
    name: "Sexual Abuse & Assault",
    category: "trauma",
    shortDescription:
      "Therapeutic support for the psychological impact of sexual violence, including trauma processing and recovery.",
    longDescription: `Sexual abuse and assault can have profound and far-reaching psychological consequences, regardless of when the experience occurred. Survivors may experience PTSD symptoms, shame, self-blame, difficulties with intimacy and trust, body image disturbance, and a range of emotional and behavioural responses that reflect the impact of the trauma on their sense of self and safety.

Many survivors carry their experiences in silence for years or decades before seeking therapeutic support. The decision to engage with therapy is a courageous one, and our practitioners are trained to create a therapeutic environment that is safe, respectful, and entirely led by the client's pace and preferences. We understand that survivors of sexual violence may have particular needs around consent, choice, and control within the therapeutic relationship.

Recovery from sexual trauma is possible. Therapy provides a confidential space to process the emotional impact of the experience, address the shame and self-blame that survivors commonly carry, rebuild a sense of safety in the body and in relationships, and reclaim a narrative of strength and resilience.`,
    symptoms: [
      "Flashbacks, nightmares, or intrusive memories of the assault",
      "Intense shame, guilt, or self-blame",
      "Difficulty with intimacy, trust, or physical closeness",
      "Hypervigilance and feeling unsafe, particularly in certain environments",
      "Emotional numbing or dissociation",
      "Body image disturbance or disconnection from the body",
      "Anxiety, depression, or difficulties with emotional regulation",
    ],
    howTherapyHelps:
      "Therapy for sexual trauma is always conducted at the survivor's pace, with a strong emphasis on choice, consent, and empowerment within the therapeutic relationship. Evidence-based approaches such as EMDR and Trauma-Focused CBT can help process traumatic memories and reduce their emotional intensity, while compassion-focused work addresses the shame and self-blame that survivors commonly experience.",
    recommendedApproaches: ["EMDR", "Trauma-Focused CBT", "Compassion-Focused Therapy", "Somatic Therapy"],
    relatedServices: ["individual-therapy"],
    icon: "ShieldCheck",
  },
  {
    slug: "domestic-violence",
    name: "Domestic & Family Violence",
    category: "trauma",
    shortDescription:
      "Psychological support for individuals affected by domestic violence, including safety planning and trauma recovery.",
    longDescription: `Domestic and family violence encompasses physical, emotional, psychological, sexual, and financial abuse within intimate or family relationships. The psychological impact of living with domestic violence can be devastating, affecting a person's sense of self, safety, autonomy, and capacity to trust others. Survivors may experience PTSD, depression, anxiety, complex grief, and profound self-doubt resulting from prolonged coercive control.

Leaving a violent relationship, while courageous, can itself be a source of significant stress and trauma. Survivors may face ongoing threats, financial hardship, housing instability, custody disputes, and the challenge of rebuilding their lives and identities after a prolonged period of control. Many survivors also grapple with shame, self-blame, and confusion about their experiences, particularly when psychological abuse has been the primary form of violence.

Therapy for domestic violence survivors prioritises safety, empowerment, and the restoration of autonomy. Our psychologists are trained in trauma-informed practice and understand the complex dynamics of coercive control. Telehealth delivery provides a particularly safe and accessible option for individuals who may still be at risk or who face barriers to attending in-person services.`,
    symptoms: [
      "Hypervigilance and persistent feelings of fear or unsafety",
      "Low self-esteem and internalisation of the abuser's narrative",
      "PTSD symptoms including flashbacks and nightmares",
      "Difficulty making decisions or trusting your own judgement",
      "Anxiety, depression, or emotional numbness",
      "Isolation from support networks and difficulty trusting others",
      "Complex grief about the relationship and what was lost",
    ],
    howTherapyHelps:
      "Therapy for domestic violence survivors begins with safety assessment and planning, then moves into processing the trauma of abuse, rebuilding self-worth and identity, and developing healthy relationship patterns. Treatment is strength-based and empowerment-focused, recognising the courage and resilience inherent in surviving abuse.",
    recommendedApproaches: ["Trauma-Focused CBT", "EMDR", "Narrative Therapy", "Compassion-Focused Therapy"],
    relatedServices: ["individual-therapy"],
    icon: "Shield",
  },

  /* ==========================================================================
     RELATIONSHIPS
     ========================================================================== */
  {
    slug: "relationship-difficulties",
    name: "Relationship Issues",
    category: "relationships",
    shortDescription:
      "Support for navigating conflict, communication breakdowns, and emotional disconnection in intimate relationships.",
    longDescription: `Relationship difficulties are one of the most common reasons people seek psychological support. Whether you are experiencing persistent conflict, emotional disconnection, communication breakdowns, trust issues, or a general sense that your relationship has lost its way, therapy can provide a structured framework for understanding what is going wrong and developing practical strategies for change.

Relationship issues rarely exist in isolation — they are typically embedded in patterns of interaction that both partners inadvertently maintain. These patterns may involve demand-withdraw dynamics, criticism-defensiveness cycles, emotional pursuer-distancer dynamics, or conflict avoidance that leads to growing resentment. Understanding these patterns is the first step toward changing them.

Therapy for relationship issues can be undertaken individually, as a couple, or both. Individual therapy can help you understand your own attachment style, communication patterns, and emotional triggers, while couples therapy provides a facilitated space for both partners to be heard and to develop new ways of connecting and resolving conflict.`,
    symptoms: [
      "Frequent arguments or unresolved recurring conflicts",
      "Emotional disconnection or feeling like roommates rather than partners",
      "Communication breakdowns or difficulty expressing needs",
      "Trust issues or lingering resentment from past hurts",
      "Difficulty with intimacy — emotional or physical",
      "Feeling unheard, unappreciated, or misunderstood by your partner",
    ],
    howTherapyHelps:
      "Couples therapy using Emotionally Focused Therapy (EFT) or the Gottman Method helps partners identify and change the negative interaction patterns that maintain conflict and disconnection. Therapy creates a safe space for each partner to express underlying emotions and needs, rebuild trust, and develop more effective communication skills.",
    recommendedApproaches: ["Emotionally Focused Therapy", "Gottman Method", "CBT", "Narrative Therapy"],
    relatedServices: ["couples-relationship-therapy", "individual-therapy"],
    icon: "HeartCrack",
  },
  {
    slug: "separation-divorce",
    name: "Separation & Divorce",
    category: "relationships",
    shortDescription:
      "Psychological support for navigating the emotional, practical, and co-parenting challenges of relationship breakdown.",
    longDescription: `The end of a significant relationship is consistently rated as one of life's most stressful events. Separation and divorce involve not only the loss of a partner and the relationship itself, but often a cascade of secondary losses — changes to living arrangements, financial circumstances, friendships, family dynamics, and daily routines. For parents, there are additional challenges around co-parenting, custody arrangements, and supporting children through the transition.

The emotional experience of separation varies enormously. Some people feel a sense of relief after making a long-considered decision, while others experience devastating grief, anger, guilt, or confusion. Many people oscillate between these states. The process can trigger or exacerbate existing mental health conditions, particularly depression, anxiety, and difficulties with self-esteem and identity.

Therapy during and after separation provides a confidential space to process the complex emotions involved, develop practical coping strategies, navigate co-parenting challenges with greater clarity, and begin to rebuild a sense of identity and purpose independent of the relationship.`,
    symptoms: [
      "Intense grief, sadness, or sense of loss",
      "Anger, resentment, or feelings of betrayal",
      "Anxiety about the future — finances, housing, social life",
      "Guilt about the impact on children or the other partner",
      "Identity confusion — who am I outside this relationship?",
      "Difficulty making decisions about practical next steps",
      "Loneliness and social withdrawal",
    ],
    howTherapyHelps:
      "Therapy during separation provides a structured, confidential space to process the complex and often contradictory emotions involved. Your psychologist can help you develop coping strategies for the acute distress, navigate co-parenting decisions with clarity, rebuild your sense of identity, and prepare for the next chapter of your life.",
    recommendedApproaches: ["CBT", "ACT", "Narrative Therapy", "Psychodynamic Therapy"],
    relatedServices: ["individual-therapy", "couples-relationship-therapy"],
    icon: "Unlink",
  },
  {
    slug: "family-conflict",
    name: "Family Conflict",
    category: "relationships",
    shortDescription:
      "Support for managing tension, boundary difficulties, and communication breakdowns within family systems.",
    longDescription: `Family relationships are among the most influential in our lives, and when they are a source of conflict, the impact can be felt across all domains of functioning. Family conflict may involve tension between parents and adult children, sibling rivalry, blended family challenges, intergenerational cultural differences, caregiving disputes, or conflict around family business or inheritance issues.

Family dynamics are complex and often deeply entrenched. Patterns of interaction established in childhood tend to persist into adulthood, and unresolved historical hurts can surface during times of stress or transition. Cultural expectations around family obligation, filial duty, and gender roles add additional layers of complexity for many Australians.

Therapy for family conflict helps individuals understand their role within the family system, develop healthier communication and boundary-setting skills, process unresolved emotions related to family relationships, and make conscious choices about how to engage with family members in ways that protect their mental health while honouring their values.`,
    symptoms: [
      "Recurring arguments or tension during family gatherings",
      "Difficulty setting or maintaining boundaries with family members",
      "Feeling guilt-tripped, manipulated, or controlled by family",
      "Unresolved resentment or historical hurts within the family",
      "Conflict around caregiving responsibilities or family expectations",
      "Feeling caught between loyalty to different family members",
    ],
    howTherapyHelps:
      "Therapy for family conflict helps you understand the dynamics and patterns within your family system, develop assertive communication and boundary-setting skills, process unresolved emotions, and make conscious choices about the role you want family to play in your life. Your psychologist provides a neutral, confidential space to explore these sensitive issues without judgement.",
    recommendedApproaches: ["CBT", "Narrative Therapy", "ACT", "Psychodynamic Therapy"],
    relatedServices: ["individual-therapy"],
    icon: "Users",
  },
  {
    slug: "infidelity",
    name: "Infidelity & Trust Repair",
    category: "relationships",
    shortDescription:
      "Navigating the devastating impact of betrayal and rebuilding trust within a relationship, or processing the experience individually.",
    longDescription: `The discovery of infidelity is often experienced as one of the most traumatic events in a person's life, shattering assumptions about the relationship, the partner, and sometimes even one's own identity and worth. The emotional aftermath can include intense grief, rage, disbelief, humiliation, hypervigilance, and symptoms that closely mirror post-traumatic stress.

Whether a couple chooses to rebuild their relationship or a partner needs to process the experience individually, specialised therapeutic support can be invaluable. For couples choosing to stay together, therapy provides a structured pathway through the stages of recovery — from the initial crisis, through understanding what happened and why, to rebuilding trust and creating a new, more honest foundation for the relationship.

For individuals processing infidelity — whether as the betrayed or the unfaithful partner — therapy offers a confidential space to understand their emotional responses, explore the impact on self-worth and future relationship capacity, and develop a coherent narrative of the experience that supports healing and growth.`,
    symptoms: [
      "Intense emotional pain, shock, or disbelief",
      "Obsessive thoughts about the affair and intrusive mental images",
      "Hypervigilance — checking partner's phone, emails, or whereabouts",
      "Loss of trust and difficulty believing anything the partner says",
      "Anger, rage, or desire for revenge",
      "Self-blame or questioning one's own worth and attractiveness",
      "Difficulty making decisions about the future of the relationship",
    ],
    howTherapyHelps:
      "Therapy for infidelity recovery follows a phased approach: stabilising the emotional crisis, developing a shared understanding of how the affair happened, and rebuilding trust through transparent communication and consistent behaviour change. Emotionally Focused Therapy (EFT) is particularly effective in helping couples access the vulnerable emotions beneath the anger and defensiveness.",
    recommendedApproaches: ["Emotionally Focused Therapy", "Gottman Method", "CBT", "Trauma-Focused Therapy"],
    relatedServices: ["couples-relationship-therapy", "individual-therapy"],
    icon: "HeartCrack",
  },
  {
    slug: "communication-problems",
    name: "Communication Problems",
    category: "relationships",
    shortDescription:
      "Developing effective interpersonal communication skills to improve relationships and reduce conflict.",
    longDescription: `Communication is the foundation of all healthy relationships, yet it is one of the most common areas of difficulty. Communication problems may manifest as difficulty expressing needs and emotions, a tendency to avoid conflict until resentment builds, passive-aggressive behaviour, difficulty listening without becoming defensive, or a pattern of criticism and contempt that erodes connection over time.

Poor communication patterns often develop in childhood, modelled by the communication styles observed in the family of origin. Without conscious awareness and effort, these patterns tend to be replicated in adult relationships, creating cycles of misunderstanding and disconnection. Stressful life circumstances, unresolved trauma, and cultural differences can further complicate interpersonal communication.

Therapy provides a unique opportunity to develop effective communication skills in a supportive, structured environment. Through observation, feedback, and practice, your psychologist can help you identify your communication patterns, understand their origins, and develop more effective alternatives that foster genuine connection and constructive conflict resolution.`,
    symptoms: [
      "Frequent misunderstandings with partners, family, or colleagues",
      "Difficulty expressing needs, feelings, or opinions clearly",
      "Tendency to avoid difficult conversations until issues escalate",
      "Becoming defensive, critical, or dismissive during discussions",
      "Difficulty listening without planning your response",
      "Patterns of passive-aggressive communication",
    ],
    howTherapyHelps:
      "Therapy for communication difficulties involves identifying your current communication patterns, understanding their origins, and developing practical skills for assertive, empathic communication. Your psychologist will use role-play, modelling, and structured exercises to help you practise expressing needs, managing conflict constructively, and listening with genuine curiosity.",
    recommendedApproaches: ["CBT", "Emotionally Focused Therapy", "ACT", "Social Skills Training"],
    relatedServices: ["couples-relationship-therapy", "individual-therapy"],
    icon: "MessageCircle",
  },

  /* ==========================================================================
     NEURODEVELOPMENTAL
     ========================================================================== */
  {
    slug: "adhd",
    name: "ADHD",
    category: "neurodevelopmental",
    shortDescription:
      "Assessment and ongoing support for Attention-Deficit/Hyperactivity Disorder in adults, including strategies for executive functioning.",
    longDescription: `Attention-Deficit/Hyperactivity Disorder (ADHD) is a neurodevelopmental condition characterised by persistent patterns of inattention, hyperactivity, and/or impulsivity that significantly affect functioning across multiple life domains. While ADHD has historically been considered a childhood condition, it is now well-established that it persists into adulthood for the majority of people, and many adults receive their first diagnosis in their 20s, 30s, or even later.

Adult ADHD often presents differently from childhood ADHD. Hyperactivity may manifest as internal restlessness rather than physical overactivity, while inattention may appear as difficulty sustaining focus on tasks, chronic procrastination, time blindness, or difficulty following through on plans. Executive functioning challenges — including working memory, planning, organisation, and emotional regulation — are core features that can significantly impact work performance, relationships, and self-esteem.

Receiving an ADHD diagnosis as an adult can be both a relief and a catalyst for significant personal growth. Understanding that lifelong difficulties with focus, organisation, and emotional regulation have a neurological basis — rather than reflecting laziness or lack of discipline — can fundamentally shift self-perception and open the door to targeted support strategies.`,
    symptoms: [
      "Difficulty sustaining attention on tasks, especially those requiring focus",
      "Chronic procrastination and difficulty initiating tasks",
      "Poor time management and time blindness",
      "Forgetfulness in daily activities and losing things frequently",
      "Difficulty organising tasks, spaces, and priorities",
      "Internal restlessness or feeling driven as if by a motor",
      "Impulsive decision-making or difficulty waiting your turn",
      "Emotional dysregulation — intense reactions that are hard to manage",
    ],
    howTherapyHelps:
      "Therapy for ADHD combines psychoeducation about the condition with practical strategies for managing executive functioning challenges. CBT adapted for ADHD targets the procrastination, disorganisation, and negative self-talk that commonly accompany the condition. Your psychologist can also support you through the assessment process and work alongside prescribing professionals if medication is being considered.",
    recommendedApproaches: ["CBT for ADHD", "Psychoeducation", "ACT", "Coaching-Informed Therapy"],
    relatedServices: ["individual-therapy", "psychological-assessments"],
    icon: "Brain",
  },
  {
    slug: "autism-spectrum",
    name: "Autism Spectrum Disorder",
    category: "neurodevelopmental",
    shortDescription:
      "Assessment and support for autistic adults, including identity exploration, social navigation, and co-occurring mental health conditions.",
    longDescription: `Autism Spectrum Disorder (ASD) is a neurodevelopmental condition characterised by differences in social communication and interaction, alongside restricted and repetitive patterns of behaviour, interests, or activities. As understanding of autism has evolved, increasing numbers of adults — particularly women and gender-diverse individuals — are seeking assessment and diagnosis later in life.

Late-diagnosed autistic adults often describe a lifetime of feeling different without understanding why. Many have developed sophisticated masking strategies to appear neurotypical, at significant cost to their mental health and authentic self-expression. Common co-occurring challenges include anxiety, depression, sensory overwhelm, burnout, difficulties in social relationships, and challenges navigating the expectations of neurotypical workplaces and social environments.

Therapy for autistic adults takes a neurodiversity-affirming approach, recognising autism as a form of neurological difference rather than a disorder to be fixed. The focus is on understanding and embracing the autistic experience, developing practical strategies for managing challenges such as sensory sensitivities and social navigation, and addressing co-occurring mental health conditions that may have developed in response to a lifetime of masking and misfit.`,
    symptoms: [
      "Difficulty navigating social situations and unwritten social rules",
      "Sensory sensitivities — overwhelm in noisy, bright, or crowded environments",
      "Need for routine and difficulty with unexpected changes",
      "Intense special interests and deep focus in areas of passion",
      "Social exhaustion and burnout from masking",
      "Difficulty identifying and expressing emotions (alexithymia)",
      "Literal interpretation of language and difficulty with ambiguity",
    ],
    howTherapyHelps:
      "Neurodiversity-affirming therapy supports autistic adults in understanding and embracing their neurotype, developing practical strategies for navigating challenges, reducing masking and its associated burnout, and addressing co-occurring mental health conditions. Therapy is adapted to suit the communication preferences and sensory needs of each individual.",
    recommendedApproaches: ["CBT (Adapted)", "ACT", "Psychoeducation", "Strengths-Based Therapy"],
    relatedServices: ["individual-therapy", "psychological-assessments"],
    icon: "Puzzle",
  },
  {
    slug: "learning-difficulties",
    name: "Learning Difficulties",
    category: "neurodevelopmental",
    shortDescription:
      "Assessment and support for specific learning difficulties, including their emotional and psychological impact.",
    longDescription: `Specific learning difficulties encompass conditions such as dyslexia, dyscalculia, and dysgraphia, which affect the acquisition and use of specific academic skills. While these conditions are typically identified in childhood, many adults have gone through their education and careers without a formal diagnosis, compensating through sheer effort while often internalising a narrative of being stupid, lazy, or inadequate.

The psychological impact of undiagnosed learning difficulties can be significant. Adults may experience chronic anxiety related to work tasks that expose their difficulties, low self-esteem, shame about academic or professional performance, and avoidance of situations that require their areas of weakness. Many develop sophisticated strategies to hide their difficulties from colleagues and loved ones, adding further stress.

Assessment can provide clarity and validation, and therapy can address the emotional legacy of years of unrecognised difficulty. Understanding that your challenges have a neurological basis — and that they coexist with significant cognitive strengths — can be a transformative experience that opens the door to targeted accommodations and a more compassionate self-narrative.`,
    symptoms: [
      "Persistent difficulty with reading, writing, or mathematics despite effort",
      "Anxiety or avoidance related to tasks requiring areas of weakness",
      "Low self-esteem and internalised beliefs about being unintelligent",
      "Compensatory strategies that are exhausting to maintain",
      "Difficulty with organisation, time management, or following instructions",
      "History of academic underachievement relative to perceived ability",
    ],
    howTherapyHelps:
      "Therapy for learning difficulties addresses both the practical challenges and the emotional impact. Cognitive assessment can identify specific areas of difficulty and strength, informing targeted strategies and workplace accommodations. Psychological therapy addresses the shame, anxiety, and negative self-beliefs that often accompany years of unrecognised learning difficulty.",
    recommendedApproaches: ["CBT", "Psychoeducation", "Strengths-Based Therapy", "Neuropsychological Assessment"],
    relatedServices: ["psychological-assessments", "individual-therapy"],
    icon: "BookOpen",
  },

  /* ==========================================================================
     BEHAVIOURAL
     ========================================================================== */
  {
    slug: "anger-management",
    name: "Anger Management",
    category: "behavioural",
    shortDescription:
      "Support for understanding and managing anger responses that are disproportionate, frequent, or causing harm to relationships.",
    longDescription: `Anger is a normal and sometimes adaptive emotion, but when it becomes frequent, intense, disproportionate, or expressed in destructive ways, it can cause significant damage to relationships, career, physical health, and self-esteem. Anger management difficulties may manifest as explosive outbursts, chronic irritability, passive-aggressive behaviour, road rage, verbal aggression, or physical intimidation.

Beneath problematic anger, there are almost always other emotions — hurt, fear, shame, frustration, or a sense of injustice or powerlessness. Understanding the functions and triggers of anger is the first step toward developing healthier ways of expressing and managing this powerful emotion. Many people with anger difficulties have learned that anger is the only acceptable or effective way to communicate distress, often modelled from their family of origin.

Therapy for anger management goes far beyond simple relaxation techniques. It involves a comprehensive exploration of the cognitive, emotional, and situational triggers for anger, the development of alternative response strategies, and often deeper work on the underlying beliefs and experiences that drive the anger response.`,
    symptoms: [
      "Frequent feelings of irritability or frustration disproportionate to the trigger",
      "Verbal or physical outbursts that you later regret",
      "Difficulty controlling anger once it has been triggered",
      "Impact on relationships — partner, family, or colleagues expressing concern",
      "Physical symptoms when angry — clenched jaw, racing heart, muscle tension",
      "Using anger to control or intimidate others",
      "Rumination and sustained resentment after conflicts",
    ],
    howTherapyHelps:
      "Therapy for anger management combines cognitive restructuring of the hostile attributions and beliefs that trigger anger, skills training in emotion regulation and assertive communication, and often deeper exploration of the vulnerability beneath the anger. Your psychologist will help you develop a personalised anger management plan that includes early warning sign recognition, de-escalation strategies, and alternative communication approaches.",
    recommendedApproaches: ["CBT", "DBT", "ACT", "Motivational Interviewing"],
    relatedServices: ["individual-therapy"],
    icon: "Flame",
  },
  {
    slug: "addiction",
    name: "Addiction & Substance Use",
    category: "behavioural",
    shortDescription:
      "Psychological support for substance use difficulties and behavioural addictions, addressing both the behaviour and underlying factors.",
    longDescription: `Addiction encompasses both substance use disorders (alcohol, drugs, prescription medication) and behavioural addictions (gambling, gaming, pornography, social media, shopping) that have become compulsive and are causing harm to the individual's health, relationships, or functioning. Addiction is increasingly understood as a condition rooted in the interplay of genetics, neurobiology, psychological vulnerability, and environmental factors, rather than a moral failing.

Many people who develop addictive behaviours are using substances or behaviours to manage emotional pain, trauma, anxiety, boredom, loneliness, or other psychological distress. The behaviour provides temporary relief but creates a cycle of dependence, withdrawal, and escalating use that progressively undermines the person's wellbeing and autonomy.

Psychological therapy plays a crucial role in addiction recovery, addressing both the addictive behaviour itself and the underlying psychological factors that drive it. A harm-reduction approach recognises that recovery is not always linear and that any reduction in harmful behaviour represents meaningful progress.`,
    symptoms: [
      "Increasing amount or frequency of substance use or behaviour",
      "Difficulty cutting down or controlling use despite wanting to",
      "Continuing use despite negative consequences on health or relationships",
      "Withdrawal symptoms when stopping or reducing use",
      "Spending significant time obtaining, using, or recovering from use",
      "Neglecting responsibilities, relationships, or activities due to use",
      "Using substances or behaviours to cope with emotional distress",
    ],
    howTherapyHelps:
      "Therapy for addiction uses Motivational Interviewing to explore ambivalence about change, CBT to identify and manage triggers and high-risk situations, and ACT to develop willingness to experience discomfort without resorting to addictive behaviours. Treatment also addresses the underlying psychological factors — such as trauma, anxiety, or depression — that often drive addictive behaviour.",
    recommendedApproaches: ["Motivational Interviewing", "CBT", "ACT", "DBT", "Narrative Therapy"],
    relatedServices: ["individual-therapy"],
    icon: "CircleSlash",
  },
  {
    slug: "gambling",
    name: "Problem Gambling",
    category: "behavioural",
    shortDescription:
      "Support for compulsive gambling behaviours that cause financial, relational, and psychological harm.",
    longDescription: `Problem gambling is characterised by persistent and recurrent gambling behaviour that causes significant distress or impairment. In Australia, where gambling is culturally normalised and widely accessible, problem gambling affects approximately 1-2% of the adult population, with a much larger proportion experiencing some level of gambling-related harm.

The impact of problem gambling extends far beyond financial loss. It commonly leads to relationship breakdown, job loss, legal difficulties, depression, anxiety, and in severe cases, suicidal ideation. The secrecy and shame that typically accompany problem gambling can create profound isolation, as individuals go to great lengths to hide the extent of their gambling from loved ones.

Gambling disorder shares many features with substance addictions, including craving, tolerance (needing to gamble with increasing amounts), withdrawal symptoms, and loss of control. Like substance use disorders, it responds well to evidence-based psychological treatment that addresses both the gambling behaviour itself and the psychological factors that maintain it.`,
    symptoms: [
      "Preoccupation with gambling and difficulty thinking about anything else",
      "Need to gamble with increasing amounts of money for the same excitement",
      "Repeated unsuccessful attempts to cut down or stop gambling",
      "Restlessness or irritability when attempting to reduce gambling",
      "Gambling to escape problems or relieve negative emotions",
      "Chasing losses — returning to gamble more after losing money",
      "Lying to conceal the extent of gambling involvement",
      "Financial difficulties, debt, or borrowing to fund gambling",
    ],
    howTherapyHelps:
      "CBT for problem gambling addresses the cognitive distortions that maintain gambling behaviour — such as the illusion of control, the gambler's fallacy, and superstitious thinking — while developing alternative coping strategies and relapse prevention skills. Motivational Interviewing helps strengthen commitment to change, and broader therapeutic work addresses the emotional needs that gambling has been serving.",
    recommendedApproaches: ["CBT", "Motivational Interviewing", "ACT", "Relapse Prevention"],
    relatedServices: ["individual-therapy"],
    icon: "Dice5",
  },
  {
    slug: "eating-disorders",
    name: "Eating Disorders",
    category: "behavioural",
    shortDescription:
      "Treatment for disordered eating patterns including restriction, bingeing, purging, and body image disturbance.",
    longDescription: `Eating disorders are serious mental health conditions characterised by persistent disturbances in eating behaviour, body image, and the thoughts and emotions associated with food and weight. They include Anorexia Nervosa, Bulimia Nervosa, Binge Eating Disorder, and Other Specified Feeding or Eating Disorders (OSFED). Eating disorders affect people of all ages, genders, and body sizes, and carry the highest mortality rate of any mental health condition.

Eating disorders are complex conditions driven by the interaction of biological, psychological, and sociocultural factors. They frequently co-occur with depression, anxiety, OCD, PTSD, and personality difficulties. The behaviours associated with eating disorders — restriction, bingeing, purging, excessive exercise, body checking — often serve as mechanisms for managing intolerable emotions, establishing a sense of control, or expressing psychological distress.

Recovery from an eating disorder is possible and is most effectively supported through evidence-based psychological therapy, often in collaboration with medical professionals and dietitians. Treatment addresses both the disordered eating behaviours and the underlying psychological and emotional factors that maintain them.`,
    symptoms: [
      "Restrictive eating, severe calorie counting, or food avoidance",
      "Binge eating episodes — eating large amounts in a short time with loss of control",
      "Compensatory behaviours such as purging, laxative use, or excessive exercise",
      "Intense preoccupation with weight, shape, or body appearance",
      "Body image disturbance — seeing yourself as larger than you are",
      "Social withdrawal and avoidance of eating in front of others",
      "Physical consequences including fatigue, dizziness, and digestive issues",
    ],
    howTherapyHelps:
      "Evidence-based therapy for eating disorders targets both the behavioural symptoms and the underlying psychological processes. CBT-E (Enhanced CBT for eating disorders) is the leading treatment for most eating disorders, working on normalising eating patterns, addressing body image disturbance, and managing the emotions and beliefs that maintain disordered eating. Your psychologist will work collaboratively with your GP and dietitian as part of a coordinated care approach.",
    recommendedApproaches: ["CBT-E", "DBT", "ACT", "Schema Therapy", "Compassion-Focused Therapy"],
    relatedServices: ["individual-therapy"],
    icon: "Utensils",
  },
  {
    slug: "self-harm",
    name: "Self-Harm",
    category: "behavioural",
    shortDescription:
      "Compassionate, non-judgemental support for individuals who use self-harm as a way of managing overwhelming emotions.",
    longDescription: `Self-harm refers to the deliberate act of injuring oneself as a way of coping with overwhelming emotional pain, distress, or numbness. It is not an attention-seeking behaviour — for most people, self-harm is conducted in private and is accompanied by significant shame and secrecy. Common forms include cutting, burning, hitting, scratching, or other methods of self-injury.

Self-harm typically serves one or more functions: it may provide temporary relief from intense emotional pain, create a sense of control when everything feels overwhelming, interrupt dissociative numbness, express distress that feels impossible to put into words, or punish oneself in response to self-directed anger or shame. While self-harm provides short-term relief, it does not address the underlying distress and often creates additional problems including scarring, shame, relationship difficulties, and escalation.

Therapy for self-harm is compassionate, non-judgemental, and focused on understanding the function that self-harm serves while developing safer alternative strategies for managing the same emotional needs. Recovery is absolutely possible, and many people who once relied on self-harm develop effective alternative coping strategies through therapeutic support.`,
    symptoms: [
      "Deliberate self-injury such as cutting, burning, or hitting",
      "Using self-harm as a way to manage overwhelming emotions",
      "Secrecy and shame about self-harm behaviour",
      "Feeling unable to cope with emotional distress without self-harm",
      "Escalation in frequency or severity of self-harm over time",
      "Scars or injuries that are difficult to explain",
    ],
    howTherapyHelps:
      "DBT is the leading evidence-based treatment for self-harm, teaching skills in distress tolerance, emotion regulation, mindfulness, and interpersonal effectiveness that provide alternatives to self-harm for managing intense emotions. Therapy is collaborative, non-judgemental, and focused on understanding what self-harm does for you before helping you find safer ways to meet those same needs.",
    recommendedApproaches: ["DBT", "CBT", "ACT", "Compassion-Focused Therapy"],
    relatedServices: ["individual-therapy"],
    icon: "AlertCircle",
  },

  /* ==========================================================================
     LIFE TRANSITIONS
     ========================================================================== */
  {
    slug: "grief-loss",
    name: "Grief & Loss",
    category: "life-transitions",
    shortDescription:
      "Support for navigating the emotional, cognitive, and practical impact of bereavement and other significant losses.",
    longDescription: `Grief is a natural and deeply personal response to loss. While most commonly associated with the death of a loved one, grief can also follow other significant losses including relationship breakdown, loss of health, miscarriage, loss of identity through career change or retirement, loss of a pet, or estrangement from family members. There is no right or wrong way to grieve, and the process does not follow a neat linear progression.

Some people experience what is known as complicated grief or prolonged grief disorder, where the acute symptoms of grief persist for an extended period and significantly interfere with the person's ability to function, find meaning, or re-engage with life. Risk factors for complicated grief include sudden or traumatic death, loss of a child, ambivalent relationships with the deceased, limited social support, and pre-existing mental health conditions.

Therapy for grief does not aim to eliminate pain or hasten the grieving process. Rather, it provides a safe space to express and process the complex emotions that accompany loss, make sense of the experience, navigate practical and relational changes, and gradually reconstruct a meaningful life that honours the significance of what has been lost.`,
    symptoms: [
      "Intense sadness, yearning, or emotional pain related to the loss",
      "Difficulty accepting the reality of the loss",
      "Feeling that life is meaningless or empty without the person or thing lost",
      "Anger, guilt, or regret related to the loss",
      "Withdrawal from social activities and relationships",
      "Difficulty planning for or imagining the future",
      "Physical symptoms including fatigue, sleep disturbance, and appetite changes",
    ],
    howTherapyHelps:
      "Grief therapy provides a compassionate space to process the complex emotions of loss at your own pace. Your psychologist may use narrative approaches to help you construct a coherent story of your loss, ACT to support you in living alongside grief while gradually re-engaging with valued activities, and practical problem-solving for the secondary challenges that often accompany bereavement.",
    recommendedApproaches: ["ACT", "Narrative Therapy", "CBT", "Psychodynamic Therapy", "Compassion-Focused Therapy"],
    relatedServices: ["individual-therapy"],
    icon: "Flower2",
  },
  {
    slug: "career-change",
    name: "Career Change & Transitions",
    category: "life-transitions",
    shortDescription:
      "Psychological support for navigating career transitions, including identity shifts, decision-making, and managing uncertainty.",
    longDescription: `Career transitions — whether chosen or imposed — can trigger significant psychological upheaval. In a culture where identity is closely tied to professional role, changing careers can feel like losing a sense of self. Whether you are contemplating a career change, navigating redundancy, starting a business, returning to work after a break, or struggling to find meaning in your current role, the psychological dimensions of career transition deserve attention.

Common challenges during career transition include decision paralysis, fear of failure, imposter syndrome, grief for the identity and status associated with the previous role, financial anxiety, relationship strain, and a crisis of meaning and purpose. Many people also grapple with internalised beliefs about productivity, success, and self-worth that make career transitions particularly anxiety-provoking.

Therapy during career transition provides a reflective space to explore your values, strengths, and motivations, challenge limiting beliefs about what you should or shouldn't do, develop practical strategies for managing uncertainty, and build the psychological resilience needed to navigate change with confidence.`,
    symptoms: [
      "Anxiety about making the wrong decision",
      "Loss of identity tied to previous professional role",
      "Imposter syndrome in a new field or role",
      "Decision paralysis or chronic indecision",
      "Financial anxiety related to the transition",
      "Strain on relationships during the transition period",
    ],
    howTherapyHelps:
      "Therapy for career transitions uses ACT to clarify values and build willingness to move toward what matters despite uncertainty, CBT to challenge perfectionist and catastrophic thinking, and coaching-informed approaches to support practical decision-making and goal-setting.",
    recommendedApproaches: ["ACT", "CBT", "Coaching Psychology", "Narrative Therapy"],
    relatedServices: ["individual-therapy"],
    icon: "Compass",
  },
  {
    slug: "retirement-adjustment",
    name: "Retirement & Ageing",
    category: "life-transitions",
    shortDescription:
      "Support for the psychological adjustment to retirement, including identity, purpose, and the challenges of ageing.",
    longDescription: `Retirement represents one of the most significant life transitions, involving the loss of a professional identity that may have been central to self-concept for decades. While often framed as a positive milestone, the reality of retirement can be psychologically challenging for many people, particularly those whose sense of purpose, social connection, and daily structure were closely tied to their work.

Common psychological challenges during retirement include a loss of identity and purpose, feelings of irrelevance or uselessness, boredom and lack of structure, relationship strain as couples adjust to spending more time together, social isolation following the loss of workplace relationships, and the confrontation with ageing, mortality, and diminishing physical capacity.

Therapy during retirement provides a space to explore the psychological dimensions of this transition, grieve the loss of professional identity, develop new sources of meaning and connection, and navigate the broader challenges of ageing with resilience and self-compassion.`,
    symptoms: [
      "Loss of sense of purpose or identity after leaving work",
      "Boredom, restlessness, or difficulty structuring days",
      "Depression or low mood following retirement",
      "Relationship tension with a partner after retirement",
      "Social isolation and loss of workplace friendships",
      "Anxiety about financial security, health, or mortality",
    ],
    howTherapyHelps:
      "Therapy for retirement adjustment helps you explore and process the loss of professional identity, identify new sources of meaning and purpose aligned with your values, develop strategies for maintaining social connection, and navigate the broader psychological challenges of ageing with resilience.",
    recommendedApproaches: ["ACT", "CBT", "Narrative Therapy", "Positive Psychology"],
    relatedServices: ["individual-therapy"],
    icon: "Sunset",
  },
  {
    slug: "new-parenthood",
    name: "New Parenthood",
    category: "life-transitions",
    shortDescription:
      "Psychological support for the identity shifts, relationship changes, and emotional challenges of becoming a parent.",
    longDescription: `Becoming a parent is one of the most profound life transitions, simultaneously joyful and overwhelming. The reality of new parenthood often diverges significantly from expectations, and many new parents struggle with the relentless demands of caring for an infant, the upheaval to their identity and relationship, sleep deprivation, and the pressure to feel uniformly happy during what society frames as a blessed time.

New parenthood challenges may include adjustment difficulties, relationship strain, identity loss, social isolation, anxiety about the baby's wellbeing, perfectionism about parenting, and the re-emergence of unresolved issues from one's own childhood. These experiences are distinct from perinatal depression or anxiety, though they may co-occur or evolve into clinical conditions if left unaddressed.

Therapy during the transition to parenthood provides a non-judgemental space to explore the complex and often contradictory emotions of new parenthood, address relationship strain, develop a realistic and compassionate approach to the parenting role, and build a sustainable support framework.`,
    symptoms: [
      "Feeling overwhelmed by the demands of caring for a new baby",
      "Loss of identity — feeling like you have lost yourself",
      "Strain on your relationship with your partner",
      "Anxiety about whether you are a good enough parent",
      "Social isolation and loss of pre-baby friendships and activities",
      "Resentment or guilt about the unequal distribution of parenting tasks",
    ],
    howTherapyHelps:
      "Therapy for new parenthood provides a non-judgemental space to process the complex emotions of this transition. Your psychologist can help you develop realistic expectations, address relationship strain, build a sustainable self-care framework, and navigate the identity shifts that accompany becoming a parent.",
    recommendedApproaches: ["ACT", "CBT", "Compassion-Focused Therapy", "Attachment-Based Therapy"],
    relatedServices: ["individual-therapy", "couples-relationship-therapy"],
    icon: "Baby",
  },
  {
    slug: "identity-self-esteem",
    name: "Identity & Self-Esteem",
    category: "life-transitions",
    shortDescription:
      "Exploring questions of identity, building self-worth, and developing a more authentic and compassionate relationship with yourself.",
    longDescription: `Identity and self-esteem difficulties are among the most common underlying themes in psychological therapy, often sitting beneath surface-level presentations such as anxiety, depression, relationship difficulties, or career dissatisfaction. Low self-esteem involves a persistent negative evaluation of oneself — feeling fundamentally inadequate, unworthy, or deficient — while identity difficulties involve a lack of clarity about who you are, what you value, and where you belong.

These difficulties may stem from childhood experiences of criticism, neglect, or conditional love; from cultural or societal messages about worth; from experiences of discrimination, bullying, or exclusion; or from significant life events that have disrupted a previously stable sense of self. They may also emerge during life transitions — such as migration, coming out, career change, or relationship breakdown — that challenge established identity frameworks.

Therapy for identity and self-esteem difficulties involves exploring the origins of negative self-beliefs, developing a more balanced and compassionate self-perspective, clarifying personal values and authentic identity, and building the confidence to live in alignment with who you truly are rather than who you believe you should be.`,
    symptoms: [
      "Persistent feelings of inadequacy, worthlessness, or not being good enough",
      "Harsh self-criticism and difficulty accepting compliments",
      "Comparing yourself unfavourably to others",
      "Difficulty making decisions due to lack of clarity about values and preferences",
      "People-pleasing and difficulty asserting your own needs",
      "Feeling like a fraud or not knowing who you really are",
      "Sensitivity to rejection or perceived criticism",
    ],
    howTherapyHelps:
      "Schema Therapy is particularly effective for self-esteem and identity work, as it identifies and modifies the deeply held beliefs and patterns (schemas) that developed in response to early life experiences. Compassion-Focused Therapy helps develop a kinder internal relationship with yourself, while ACT supports you in clarifying your values and building a life aligned with authentic identity rather than external expectations.",
    recommendedApproaches: ["Schema Therapy", "Compassion-Focused Therapy", "ACT", "Psychodynamic Therapy"],
    relatedServices: ["individual-therapy"],
    icon: "Fingerprint",
  },

  /* ==========================================================================
     WORKPLACE
     ========================================================================== */
  {
    slug: "burnout",
    name: "Burnout",
    category: "workplace",
    shortDescription:
      "Chronic workplace stress that has progressed to emotional exhaustion, cynicism, and reduced professional efficacy.",
    longDescription: `Burnout is a state of chronic physical and emotional exhaustion that results from prolonged exposure to workplace stress. Recognised by the World Health Organization as an occupational phenomenon, burnout is characterised by three dimensions: overwhelming emotional exhaustion, depersonalisation or cynicism toward work and colleagues, and a diminished sense of personal accomplishment and professional efficacy.

Burnout is not simply being tired or stressed — it represents a fundamental breakdown in the relationship between the person and their work. It develops when job demands consistently exceed available resources, when individuals feel they lack control over their work, when effort goes unrecognised, or when workplace values conflict with personal values. Certain professions — including healthcare, education, social work, and emergency services — carry elevated burnout risk due to their inherent emotional demands.

Recovery from burnout requires more than a holiday. It involves a systematic examination of the work-person fit, the development of sustainable boundaries and self-care practices, the rebuilding of meaning and engagement, and often deeper work on the perfectionism, people-pleasing, and self-worth beliefs that may have contributed to the path toward burnout.`,
    symptoms: [
      "Profound physical and emotional exhaustion that does not improve with rest",
      "Cynicism, detachment, or negativity toward work",
      "Reduced professional efficacy and declining performance",
      "Difficulty concentrating or making decisions at work",
      "Loss of meaning and motivation in your professional role",
      "Physical symptoms including headaches, insomnia, and frequent illness",
      "Withdrawal from colleagues, clients, or patients",
      "Feeling trapped in your current situation",
    ],
    howTherapyHelps:
      "Therapy for burnout involves understanding the systemic and personal factors that contributed to exhaustion, rebuilding sustainable boundaries and self-care practices, addressing perfectionism and people-pleasing patterns, and rediscovering meaning and purpose in work. Your psychologist will work with you to develop a recovery plan that addresses both immediate coping and longer-term prevention.",
    recommendedApproaches: ["CBT", "ACT", "Compassion-Focused Therapy", "Coaching Psychology"],
    relatedServices: ["individual-therapy", "corporate-eap", "workshops-training"],
    icon: "BatteryLow",
  },
  {
    slug: "workplace-bullying",
    name: "Workplace Bullying",
    category: "workplace",
    shortDescription:
      "Psychological support for individuals experiencing or recovering from workplace bullying, harassment, or toxic work environments.",
    longDescription: `Workplace bullying involves repeated unreasonable behaviour directed toward an employee that creates a risk to health and safety. It may include verbal abuse, humiliation, exclusion, intimidation, undermining of work, withholding of information, micromanagement, or setting impossible deadlines. Workplace bullying can be perpetrated by supervisors, colleagues, or even subordinates, and can occur in person or through digital communication.

The psychological impact of workplace bullying is significant and well-documented. Targets of bullying commonly experience anxiety, depression, PTSD-like symptoms, sleep disturbance, loss of confidence, hypervigilance, and a pervasive sense of self-doubt about their professional competence and personal worth. The effects often extend beyond the workplace, affecting relationships, physical health, and overall quality of life.

Therapy for workplace bullying provides a confidential space to process the emotional impact, rebuild self-confidence and professional identity, develop strategies for managing the current situation (including documentation, assertiveness, and accessing formal complaint pathways), and address any trauma responses that have developed. For those who have left a toxic workplace, therapy supports recovery and the rebuilding of confidence for re-entering the workforce.`,
    symptoms: [
      "Anxiety or dread about going to work",
      "Loss of professional confidence and self-doubt",
      "Sleep disturbance and difficulty switching off from work stress",
      "Hypervigilance around the bully or in workplace settings",
      "Physical symptoms including headaches, nausea, and muscle tension",
      "Social withdrawal and isolation at work",
      "Depression, hopelessness, or feeling trapped",
    ],
    howTherapyHelps:
      "Therapy for workplace bullying provides validation and a safe space to process the emotional impact, rebuild professional confidence and self-worth, develop assertiveness and boundary-setting skills, create a practical action plan for managing the situation, and address any trauma responses that have developed. Your psychologist can also provide support documentation if formal processes are being pursued.",
    recommendedApproaches: ["CBT", "ACT", "Trauma-Focused Therapy", "Assertiveness Training"],
    relatedServices: ["individual-therapy", "corporate-eap"],
    icon: "ShieldX",
  },
  {
    slug: "performance-anxiety",
    name: "Performance Anxiety",
    category: "workplace",
    shortDescription:
      "Fear of performance situations — presentations, meetings, interviews, or high-stakes work tasks — that limits professional potential.",
    longDescription: `Performance anxiety in the workplace involves intense fear and apprehension related to situations where one's competence or ability is being evaluated. This may include public speaking, giving presentations, participating in meetings, attending interviews, managing confrontation, or performing under high-stakes conditions. While related to social anxiety, workplace performance anxiety is specifically focused on professional contexts and can significantly limit career progression and job satisfaction.

People with performance anxiety often experience a vicious cycle: anxiety leads to avoidance or diminished performance, which reinforces beliefs about incompetence, which increases anxiety about future performance. Many high-achieving professionals hide significant performance anxiety behind extensive preparation, overwork, or delegation of anxiety-provoking tasks, maintaining their career at the cost of considerable psychological distress.

Therapy for performance anxiety helps individuals break the anxiety-avoidance-underperformance cycle through a combination of cognitive restructuring, graduated exposure, and skills-based training. Most people experience meaningful improvement within 6 to 12 sessions.`,
    symptoms: [
      "Intense anxiety before or during presentations, meetings, or evaluations",
      "Physical symptoms — racing heart, sweating, trembling, dry mouth, mind blanks",
      "Avoidance of performance situations or over-preparation to compensate",
      "Catastrophic thinking about judgment, failure, or humiliation",
      "Imposter syndrome — feeling like a fraud despite objective success",
      "Career limitation due to avoidance of high-visibility opportunities",
    ],
    howTherapyHelps:
      "CBT for performance anxiety targets the catastrophic predictions and self-focused attention that drive anxiety in performance situations. Therapy involves cognitive restructuring, attention training, and graduated exposure to increasingly challenging performance scenarios. Skills training in presentation, assertiveness, and meeting participation can also be incorporated.",
    recommendedApproaches: ["CBT", "ACT", "Exposure Therapy", "Coaching Psychology"],
    relatedServices: ["individual-therapy", "corporate-eap"],
    icon: "Presentation",
  },
  {
    slug: "work-life-balance",
    name: "Work-Life Balance",
    category: "workplace",
    shortDescription:
      "Developing sustainable boundaries between work and personal life to protect wellbeing, relationships, and long-term health.",
    longDescription: `In an era of remote work, digital connectivity, and blurred boundaries between professional and personal spheres, achieving a sustainable work-life balance has become one of the most common challenges facing Australian professionals. Work-life imbalance is not simply a time management problem — it is often rooted in deeper beliefs about productivity, self-worth, perfectionism, and the fear of professional consequences of setting boundaries.

Chronic work-life imbalance can lead to burnout, relationship strain, health problems, reduced productivity (paradoxically), and a pervasive sense that life is passing by while you are stuck on a treadmill. The rise of remote and hybrid work has created additional challenges, as the physical separation between office and home has dissolved for many workers.

Therapy for work-life balance goes beyond scheduling tips and time management. It involves exploring the beliefs and fears that drive overwork, developing assertive communication and boundary-setting skills, reconnecting with personal values and priorities beyond work, and creating a sustainable framework for managing competing demands that protects both professional performance and personal wellbeing.`,
    symptoms: [
      "Regularly working beyond contracted hours or unable to switch off",
      "Guilt when not working or difficulty enjoying leisure time",
      "Relationship strain due to work demands and unavailability",
      "Physical and emotional exhaustion with no time for recovery",
      "Neglect of personal health, hobbies, friendships, and self-care",
      "Feeling that work controls your life rather than the other way around",
    ],
    howTherapyHelps:
      "Therapy for work-life balance helps you identify and challenge the beliefs and fears that drive overwork, develop practical boundary-setting skills, reconnect with personal values and priorities, and build a sustainable framework for managing competing demands. ACT is particularly effective in helping you clarify what truly matters and make values-aligned choices about how you invest your time and energy.",
    recommendedApproaches: ["ACT", "CBT", "Coaching Psychology", "Mindfulness-Based Stress Reduction"],
    relatedServices: ["individual-therapy", "corporate-eap", "workshops-training"],
    icon: "Scale",
  },
];

/* ==========================================================================
   Helper functions
   ========================================================================== */

export function getConditionBySlug(slug: string): Condition | undefined {
  return conditions.find((c) => c.slug === slug);
}

export function getConditionsByCategory(category: string): Condition[] {
  return conditions.filter((c) => c.category === category);
}

export function getAllConditionSlugs(): string[] {
  return conditions.map((c) => c.slug);
}

export const conditionCategoryOrder: string[] = [
  "mood",
  "anxiety",
  "trauma",
  "relationships",
  "neurodevelopmental",
  "behavioural",
  "life-transitions",
  "workplace",
];
