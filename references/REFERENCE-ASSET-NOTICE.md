# Reference asset notice

## Purpose

Reference assets are provided for visual guidance only. They define the
canonical appearance of Ahmed and Sana for future design, animation, rigging,
and asset-creation work.

## Runtime impact

Reference assets have no runtime impact. They do not introduce or modify
animation behavior, character rigs, triggers, controls, physics, state
machines, scene logic, audio, rendering, application code, build
configuration, dependencies, or executable resources.

## Canonical status

```text
Asset type: Visual Reference
Runtime dependency: No
Animation dependency: No
Behavior change: No
Code change: No
Canonical visual reference: Yes
```

## Usage rule

Future artwork involving Ahmed or Sana should use the canonical references to
maintain visual consistency. Actual animation and runtime implementation must
be created separately under the appropriate production directories.

## Separation of concerns

```text
REFERENCE
    |
    +-- Visual guidance only
             |
             v
       PRODUCTION ASSETS
             |
             v
       ANIMATION / RIG
             |
             v
          RUNTIME
```

The reference assets do not participate directly in the runtime pipeline.
