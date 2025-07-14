(async () => {
  const { airtableApiKey, baseId, defaultNiche } = window.CONFIG;
  document.getElementById('niche-name').innerText = defaultNiche;
  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(defaultNiche)}?api_key=${airtableApiKey}`;
  const res = await fetch(url);
  const { records } = await res.json();
  const app = document.getElementById('app');

  records
    .filter(r => r.fields.Status === 'deployed')
    .forEach(({ fields }) => {
      const card = document.createElement('div');
      card.innerHTML = `
        <h2>${fields['Product Name']}</h2>
        <p>${fields.Description || ''}</p>
        <a href="${fields['Affiliate URL']}" target="_blank">View Product</a>
      `;
      app.appendChild(card);
    });
})();
