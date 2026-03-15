PROJECT
ResearchGen AI — Design System & App


------------------------------------------------
FIGMA FILE STRUCTURE
------------------------------------------------

Pages

00_Cover

01_Design_System

02_Components

03_Patterns

04_App_Screens

05_User_Flow

06_AI_Generation



------------------------------------------------
PAGE 00
Cover
------------------------------------------------

Frame
Project Overview

Content

ResearchGen AI
AI UX Research Tool

Flow

Idea Input
→ AI Analysis
→ Insight Map
→ Persona
→ Journey Map
→ Opportunity Map
→ UX Report



------------------------------------------------
PAGE 01
Design System
------------------------------------------------

Frames

Color

Typography

Spacing

Grid

Elevation



Color Tokens

color/background
color/card
color/border
color/primary
color/muted
color/chart



Typography Tokens

type/page-title

type/section-title

type/card-title

type/body

type/caption



Spacing Tokens

space/8

space/16

space/24

space/32

space/40

space/48



Grid Tokens

layout/container

layout/grid-2

layout/full-canvas



------------------------------------------------
PAGE 02
Components
------------------------------------------------

Frames

component/card

component/button

component/input

component/section-header

component/chart-container

component/persona-card

component/insight-card

component/journey-node



Component Naming Rule

component/<name>



Examples

component/card

component/button

component/persona

component/journey-node



------------------------------------------------
PAGE 03
Patterns
------------------------------------------------

Frames

pattern/chart-card

pattern/chart-text

pattern/matrix-layout

pattern/journey-canvas

pattern/analysis-cards



Pattern Examples

Chart + Text Layout

[chart] | [explanation]



Matrix Layout

Persona Matrix

Opportunity Matrix



Journey Canvas

Emotion Axis

Phase Grid

Nodes

Experience Row

Expectation Row



------------------------------------------------
PAGE 04
App Screens
------------------------------------------------

Frames

screen/01-idea-input

screen/02-ai-analysis

screen/03-insight-map

screen/04-persona

screen/05-journey-map

screen/06-opportunity-map

screen/07-ux-report



Each screen must be built using components from PAGE 02.



------------------------------------------------
PAGE 05
User Flow
------------------------------------------------

Frame

User Flow Diagram



Flow Order

01 Idea Input

↓

02 AI Analysis

↓

03 Insight Map

↓

04 Persona

↓

05 Journey Map

↓

06 Opportunity Map

↓

07 UX Report



Each node must reference frames from PAGE 04.



------------------------------------------------
PAGE 06
AI Generation
------------------------------------------------

Frames

Reference Layout

Wireframe Example

Report Layout



Include

UX Report sample layout

Journey Map sample layout

Opportunity Map layout



------------------------------------------------
AUTO LAYOUT RULES
------------------------------------------------

All frames must use Auto Layout



Page Container

direction: vertical

gap: 32

padding: 48



Card Component

padding: 24

gap: 16



Section Layout

gap: 40~56



------------------------------------------------
CHART RULES
------------------------------------------------

All charts must be inside

component/chart-container



Structure

ChartContainer

    Chart

    Description



------------------------------------------------
JOURNEY MAP STRUCTURE
------------------------------------------------

Frame

journey/canvas



Structure

Persona Header

Emotion Axis

Phase Grid

Emotion Curve

Experience Row

Expectation Row

Journey Insights



Emotion Node Rule

Emoji center = anchor point

Line connects emoji centers only



Grid Rule

Intersection cells must remain empty



------------------------------------------------
FIGMA MAKE RULES
------------------------------------------------

Use the Design System page as the visual reference.

Reuse components from the Components page.

Follow layout patterns from the Patterns page.

Use the User Flow page to generate the final application screens.



------------------------------------------------
ANTIGRAVITY IMPLEMENTATION RULES
------------------------------------------------

Implement screens based on the App Screens page.

Reuse component structure.

Follow spacing and color tokens from the Design System.



------------------------------------------------
FINAL PIPELINE
------------------------------------------------

Design System

↓

User Flow

↓

App Screens

↓

Figma Make

↓

Final Layout

↓

Antigravity

↓

Code

