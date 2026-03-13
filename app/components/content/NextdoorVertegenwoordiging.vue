<template>
  <section class="vertegenwoordiging">
    <div class="container">
      <h2 class="section-title">NEXTDOOR VERTEGENWOORDIGING</h2>
      <p class="section-intro">Als allround bureau ontzorgt <strong>Nextdoor Interieurontwerp en -advies</strong> klanten bij het design van exterieur en interieur en ondersteunen we het gehele proces van gemeentelijke vergunningen tot het begeleiden van de aannemers.</p>
      <p class="section-intro">Bij ons kun je terecht voor een ontwerp en interieuradvies voor nieuw-/verbouw en renovatie van huis, kantoor en bedrijfspand.</p>
      <div class="team-member">
        <div class="member-photo">
          <img src="/images/home/petra.jpg" alt="Petra Willems - Interieur designer en ontwerper" />
        </div>
        <div class="member-info">
          <p class="member-name">Petra Willems</p>
          <p class="member-desc"><strong>Petra</strong> is interieur designer en ontwerper. Ze geeft vakkundig advies over vraagstukken omtrent kantoorinrichting, wooninrichting, woondesign, kleur, verlichting en materiaalkeuze.</p>
          <a href="mailto:petra@nextdoorinterieurontwerp.nl" class="btn-orange">
            <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
            E-MAIL PETRA
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.vertegenwoordiging {
  padding: 8rem 0;
  background-color: #fff;
}
.section-title {
  text-align: center;
  font-size: 3.6rem;
  color: var(--text-dark);
  margin-bottom: 3rem;
}
.section-intro {
  text-align: center;
  font-size: 1.5rem;
  color: var(--text);
  max-width: 900px;
  margin: 0 auto 1.5rem;
  line-height: 1.8;
}
.team-member {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 8rem;
  align-items: center;
  margin-top: 6rem;
}
.member-photo img {
  width: 100%;
  max-width: 340px;
  aspect-ratio: 1;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin: 0 auto;
}
.member-name {
  font-family: "aesthetikos", "Brush Script MT", cursive !important;
  font-size: 15rem;
  margin-bottom: 2rem;
  display: block;
}
.member-desc {
  font-size: 1.5rem;
  color: var(--text);
  line-height: 1.8;
  margin-bottom: 3rem;
}
.btn-icon {
  width: 18px;
  height: 18px;
  margin-right: 0.8rem;
  vertical-align: middle;
  color: #fff;
}
@media (max-width: 900px) {
  .team-member {
    grid-template-columns: 1fr;
    gap: 4rem;
    text-align: center;
  }
  .member-name {
    font-size: 3.5rem;
  }
}
</style>
