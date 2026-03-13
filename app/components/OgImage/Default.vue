<template>
  <div :style="{
    width: '1200px',
    height: '630px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    background: 'linear-gradient(135deg, #111111 0%, #2a2a2a 100%)',
    fontFamily: 'Montserrat, sans-serif',
  }">
    <div :style="{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
      padding: '60px',
      textAlign: 'center',
    }">
      <img src="/images/home/logo-full.svg" alt="NEXTDOOR Interieur Ontwerp" :style="{ width: '480px', height: 'auto' }" />
      <div :style="{ width: '80px', height: '2px', backgroundColor: '#C3D8ED' }" />
      <p :style="{
        color: '#ffffff',
        fontSize: '28px',
        fontWeight: '400',
        margin: '0',
        letterSpacing: '0.05em',
      }">{{ title || 'Interieurontwerp & -advies' }}</p>
      <p :style="{
        color: '#C3D8ED',
        fontSize: '18px',
        fontWeight: '400',
        margin: '0',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }">Oss · Noord-Brabant</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>
