window.createTerrainLessons = function (app) {
  const { $, esc, action, guide, outline } = app;
  const models = {
    mountain: ['산지', '설악산을 지도에서 찾아요. 모형을 옆에서 보면 봉우리 높이와 사면의 경사가, 위에서 보면 이어진 능선과 그 사이 골짜기가 보여요.'],
    river: ['하천', '한강 수계와 연결해요. 같은 물길을 따라 좁은 골짜기와 넓고 낮은 땅을 비교하고, 화살표로 상류에서 하류로 이어지는 흐름을 확인해요.'],
    east: ['동해안', '강릉 정동진 일대와 연결해요. 위에서 해안선과 섬을 살펴본 뒤, 바다 쪽에서 급한 구간과 완만한 구간을 비교해요.'],
    west: ['서해안', '태안 신두리 일대와 연결해요. 위에서 해안선이 들어간 곳과 섬을 찾고, 옆에서 육지가 완만하게 수면과 만나는 구간을 살펴봐요.'],
    south: ['남해안', '여수 금오도 일대와 연결해요. 위에서 육지 해안선과 가까운 섬들을 살펴보고, 옆에서 바위 해안의 높이 차를 찾아요.'],
    dokdo: ['독도', '서도와 동도 사이에 바닷물이 있어요. 두 섬의 높이와 바위 해안의 경사를 비교해요.']
  };
  const groups = [['mountain', 'river'], ['east', 'west', 'south'], ['dokdo'], ['dokdo']];
  const atlas = 'https://nationalatlas.ngii.go.kr/pages/page_3982.php';
  const nature = 'https://dokdo.mofa.go.kr/kor/introduce/nature.jsp';
  const location = 'https://dokdo.mofa.go.kr/kor/introduce/location.jsp';
  const link = (url, title) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a>`;
  const places = {
    a: [128.465, 38.119, '설악산 대청봉', 'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=9a2b453f-40c1-42c0-af9d-98c573240b78'],
    b: [128.916, 37.23, '태백 검룡소', 'https://hangang.seoul.go.kr/www/contents/770.do?mid=578'],
    c: [127.312, 37.532, '양평 두물머리', 'https://encykorea.aks.ac.kr/Article/E0012254'],
    d: [126.54, 37.776, '한강 하구', 'https://encykorea.aks.ac.kr/Article/E0060950'],
    e: [129.036, 37.684, '강릉 정동진', 'https://encykorea.aks.ac.kr/Article/E0067515'],
    f: [126.189, 36.836, '태안 신두리', 'https://www.taean.go.kr/tour/sub03_06_01.do'],
    g: [127.767, 34.515, '여수 금오도', 'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=107e9017-f106-4400-8ff9-55379c2be1f3'],
    u: [130.90, 37.48, '울릉도', location],
    v: [131.87, 37.24, '독도', location]
  };
  const han = [[128.916, 37.23], [128.72, 37.25], [128.47, 37.17], [128.27, 37.01], [128.08, 36.99],
    [127.91, 37.08], [127.78, 37.15], [127.63, 37.26], [127.46, 37.33], [127.43, 37.49],
    [127.312, 37.532], [127.19, 37.55], [127.05, 37.52], [126.92, 37.53], [126.8, 37.59],
    [126.67, 37.65], [126.59, 37.74], [126.54, 37.776]];

  const tasks = [
    [
      { model: 'mountain', title: '산지 모형을 지도와 연결해요', map: 'abg', answer: 'a',
        hint: '한반도 지도에서 동해와 가까운 강원도 북쪽 산지를 찾아봐요.',
        success: '강원도 동쪽 산지에서 설악산을 찾았어요.' },
      { model: 'river', title: '한강 상류 쪽을 찾아요', map: 'bcd', river: true, answer: 'b',
        hint: '물길이 시작되는 높은 땅을 찾아요. 황해에서 멀리 떨어진 쪽이에요.',
        success: '태백 검룡소 쪽 물줄기가 한강으로 이어져요.' },
      { model: 'river', title: '한강 하류 쪽을 찾아요', map: 'bcd', river: true, answer: 'd',
        hint: '한강 물길을 따라가며 바다와 가까운 쪽을 찾아요.',
        success: '한강은 하구를 거쳐 서쪽의 황해로 흘러요.' },
      { model: 'river', title: '지도에서 한강이 흐르는 방향은?', map: 'bcd', river: true, answer: 1,
        choices: ['황해 쪽 → 산지 쪽', '산지 쪽 → 황해 쪽', '동해 쪽 → 황해 쪽'],
        hint: '북쪽을 위로 두고 지도를 봐요. 높은 땅에서 시작한 물길이 어느 바다로 이어지나요?',
        success: '한강은 동쪽 산지 쪽에서 시작해 대체로 서쪽으로 이어져요.' }
    ],
    [
      { model: 'east', title: '동해안 모형을 지도와 연결해요', map: 'efg', answer: 'e',
        hint: '북쪽이 위인 지도에서 동해가 어느 쪽에 있는지 봐요.',
        success: '강원도 강릉 정동진은 동해안에 있어요.' },
      { model: 'west', title: '서해안 모형을 지도와 연결해요', map: 'efg', answer: 'f',
        hint: '황해와 맞닿고 육지가 바다 쪽으로 길게 나온 곳을 찾아요.',
        success: '충청남도 태안 신두리는 서해안에 있어요.' },
      { model: 'south', title: '남해안 모형을 지도와 연결해요', map: 'efg', answer: 'g',
        hint: '전라남도 남쪽 바다에 섬이 모인 곳을 찾아봐요.',
        success: '전라남도 여수의 금오도 일대는 남해안에 있어요.' },
      { title: '세 해안에 어울리는 설명을 골라요', answer: 2,
        choices: [
          '동해안의 해안선이 가장 굽어 있고, 남해안에는 섬이 거의 보이지 않아요.',
          '동해안·서해안·남해안은 해안선의 굽은 정도와 섬 분포가 모두 비슷해요.',
          '동해안은 해안선이 비교적 단순해요. 서해안과 남해안은 굽은 곳이 많고, 남해안 모형에는 섬이 모여 있어요.'
        ],
        hint: '세 모형을 모두 위에서 봐요. 육지와 물이 만나는 선이 얼마나 굽는지, 바다에 섬이 얼마나 보이는지 따로 비교해요.',
        success: '해안선 모양과 섬 분포를 모두 근거로 설명했어요.' }
    ],
    [
      { title: '독도가 있는 바다를 찾아요', map: 'uv', zoom: true, answer: 0,
        choices: ['동해', '황해', '남해'], hint: '우리나라 전체 지도에서 울릉도와 독도가 있는 쪽의 바다 이름을 찾아요.',
        success: '울릉도와 독도는 동해에 있어요.' },
      { title: '울릉도를 기준으로 독도의 위치를 말해요', map: 'uv', zoom: true, answer: 1,
        choices: ['북동쪽', '남동쪽', '남서쪽'], hint: '방위표를 보고 울릉도에서 독도로 갈 때 오른쪽인지 왼쪽인지, 위쪽인지 아래쪽인지 따로 살펴봐요.',
        success: '독도는 울릉도의 남동쪽에 있어요.' },
      { model: 'dokdo', title: '독도의 바위 해안을 살펴봐요', answer: 0, review: 'model',
        choices: ['두 섬에는 바닷물에서 가파르게 솟은 바위 해안이 보여요.', '두 섬이 하나의 넓고 평평한 땅으로 이어져 있어요.'],
        hint: '비스듬히 보기에서 두 섬 사이와 물에서 바위로 이어지는 곳을 살펴봐요.',
        success: '두 섬 사이에는 물이 있고 해안에는 가파른 구간이 보여요.' },
      { title: '사진이나 설명 자료에서 단서를 찾아요', answer: 1, review: 'photos',
        choices: ['설명 자료에는 독도에서 안개가 거의 생기지 않는다고 나와요.', '설명 자료에는 독도 주변에 안개가 자주 낀다고 나와요.', '설명 자료에는 독도에 식물이 살지 않는다고 나와요.'],
        hint: '사진·설명 자료에서 기후를 읽고 바위섬 뒤쪽이 어떻게 보이는지 비교해요.',
        success: '이제 자료에서 확인한 기후나 생물 중 카드에 소개할 내용을 골라요.' }
    ]
  ];
  const worksheets = [
    { title: '산지·하천 탐험 지도', list: [
      '활동지 지도에서 산지와 하천을 서로 다른 색으로 표시해요.',
      '하천이 어디에서 어디로 흐르는지 물길 위에 화살표를 그려요.',
      '지도를 보고 산지와 하천의 분포 특징을 한 문장으로 적어요.'
    ], label: '활동지에 적을 분포 특징', placeholder: '지도에서 높은 산지는 주로…, 여러 큰 하천은…' },
    { title: '세 해안 비교표', list: [
      '동해안·서해안·남해안별로 해안선 모양과 섬의 분포를 표에 옮겨 적어요.',
      '처음 사진을 보고 예상한 내용과 탐험 결과를 비교해 맞았거나 달라진 점을 적어요.',
      '짝에게 관찰 근거를 말해요. “나는 ___을 보고 ___해안이라고 판단했어.”'
    ], label: '예상과 비교해 확인한 특징', placeholder: '처음에는 …라고 예상했지만, 모형에서 …을 보았어요.' },
    { title: '모둠 독도 자연환경 소개 카드', list: [
      '북쪽을 표시한 작은 지도에 울릉도와 독도를 그리고 이름을 써요.',
      '3D 지형에서 직접 본 특징을 한 가지 적어요.',
      '사진이나 설명에서 알게 된 기후 또는 동식물 특징 한 가지와 자료 이름을 적어요.'
    ], label: '모둠 카드에 넣은 두 가지 특징', placeholder: '모형에서 …을 봤어요. … 자료에서는 …을 확인했어요.' }
  ];
  const guardianFields = [
    ['position', '① 울릉도와 독도의 위치', '울릉도를 기준으로 독도가 어느 쪽에 있는지 적어요.'],
    ['nature', '② 알리고 싶은 독도의 자연환경과 확인한 자료', '자연환경 특징과 그 사실을 확인한 사진이나 설명 자료의 이름을 적어요.'],
    ['action', '③ 내가 할 수 있는 일과 그 까닭', '독도를 알리거나 자연환경을 보호하기 위해 할 수 있는 일과 그 이유를 적어요.']
  ];
  const checks = ['위치와 방향이 알아보기 쉬워요.', '자연환경 특징과 확인한 자료가 들어 있어요.', '할 수 있는 행동과 이유가 구체적이에요.'];

  function path(points, xy, close = '') {
    return points.map((p, i) => (i ? 'L' : 'M') + xy(p).join(',')).join(' ') + close;
  }
  function mapMarkup(codes, { zoom = 0, river = false, pick = false, arrows = false, distribution = false } = {}) {
    const bounds = [[123.5, 32.7, 132.9, 43.4], [127.65, 35.95, 132.45, 39.35], [129.9, 36.75, 132.45, 38.05]][zoom];
    const [west, south, east, north] = bounds;
    const width = 440, height = zoom === 0 ? 460 : zoom === 1 ? 310 : 255;
    const scale = Math.min((width - 35) / ((east - west) * .79), (height - 24) / (north - south));
    const xy = ([lon, lat]) => [width / 2 + (lon - (west + east) / 2) * scale * .79,
      height / 2 - (lat - (north + south) / 2) * scale];
    const islandPath = (lon, lat, w, h) => path([[lon - w, lat], [lon - w / 2, lat + h * .82], [lon + w / 2, lat + h],
      [lon + w, lat], [lon + w / 2, lat - h * .76], [lon - w / 2, lat - h]], xy, 'Z');
    const dots = [...codes].map((code, i) => {
      const [x, y] = xy(places[code]);
      const title = places[code][2];
      return pick ? `<button class="map-point" data-map-choice="${code}" style="left:${x / width * 100}%;top:${y / height * 100}%"
         aria-label="지도 ${i + 1}번 ${title}">${i + 1}</button>`
        : `<span class="map-pin ${code === 'v' ? 'dokdo-pin' : ''}" style="left:${x / width * 100}%;top:${y / height * 100}%"><b></b><span>${title}</span></span>`;
    }).join('');
    const seas = (zoom ? [['동해', 130.38, 36.99]] : [['황해', 124.62, 36.66], ['동해', 130.1, 39.27], ['남해', 128.6, 33.7]])
      .map(([name, lon, lat]) => { const [x, y] = xy([lon, lat]); return `<text x="${x}" y="${y}" class="sea-name">${name}</text>`; }).join('');
    const ridgePath = path([[128.68, 38.46], [128.48, 38.02], [128.70, 37.74], [128.93, 37.29], [128.93, 36.88]], xy);
    const hanPath = path(han, xy);
    const otherRivers = [
      { name: '금강', points: [[127.52, 35.65], [127.57, 36.01], [127.58, 36.28], [127.39, 36.52], [127.14, 36.46], [126.91, 36.28], [126.80, 36.13], [126.68, 36.0]], label: [126.16, 36.13] },
      { name: '낙동강', points: [[128.98, 37.18], [128.88, 36.98], [128.72, 36.60], [128.25, 36.53], [128.25, 36.28], [128.4, 35.87], [128.46, 35.54], [128.72, 35.39], [128.95, 35.11], [128.93, 34.99]], label: [129.2, 35.66] }
    ];
    return `<div class="lesson-map" style="aspect-ratio:${width}/${height}">
      <svg viewBox="0 0 ${width} ${height}" aria-label="북쪽이 위인 우리나라 개략 지도" role="img">
        <path class="map-land" d="${path(outline, xy, 'Z')}${islandPath(126.55, 33.38, .41, .15)}"/>
        ${seas}
        ${river ? `<path class="map-ridge" d="${ridgePath}"/><path class="map-river" d="${hanPath}"/>` : ''}
        ${river && arrows ? `<defs><marker id="hanHead" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L8 4 0 8Z" fill="#16566f"/></marker></defs>
          <path d="${path([han[5], han[8], han[10]], xy)}" fill="none" stroke="#16566f" stroke-width="2" marker-end="url(#hanHead)"/>
          <path d="${path([han[12], han[15], han[17]], xy)}" fill="none" stroke="#16566f" stroke-width="2" marker-end="url(#hanHead)"/>` : ''}
        ${distribution ? otherRivers.map(({ name, points, label }) => {
          const [x, y] = xy(label);
          return `<path class="map-river" d="${path(points, xy)}" marker-end="url(#hanHead)"/><text x="${x}" y="${y}" class="sea-name">${name}</text>`;
        }).join('') : ''}
        ${zoom ? `<path class="islands-line" d="${path([places.u, places.v], xy)}"/>` : ''}
        <path class="compass-line" d="M${width-32} 30v38m-15-18h30m-19-15 4-6 4 6"/>
        <text class="compass-text" x="${width-32}" y="23">북</text><text class="compass-text" x="${width-10}" y="54">동</text>
        <text class="compass-text" x="${width-32}" y="82">남</text><text class="compass-text" x="${width-54}" y="54">서</text>
      </svg>${dots}</div>
      <small class="map-caption">해안선·물길을 단순화한 개략 지도예요. 섬과 지점은 기호로 표시했어요.</small>`;
  }

  let id = 0, phase = 0, kind, view, zoom = 0, seen, flags;
  let answered = false, cardDraft, status = '';
  const modelButtons = () => `<div class="row model-choice" aria-label="관찰할 지형">${groups[id].map(key =>
    `<button type="button" data-model="${key}" aria-pressed="${key === kind}">${models[key][0]}</button>`).join('')}</div>`;
  const world = () => app.world();
  function setWorld(show) {
    $('world').classList.toggle('lesson-map-mode', !show);
    $('lessonStage').hidden = show;
    $('lessonViews').hidden = !show;
    $('lessonOverlay').hidden = !show;
    if (show) world().resize();
  }
  function close() {
    $('world').classList.remove('lesson-world', 'lesson-map-mode');
    $('lessonStage').hidden = $('lessonViews').hidden = $('lessonOverlay').hidden = true;
    const printSheet = $('lessonPrint');
    printSheet.hidden = true;
    document.body.classList.remove('print-lesson');
  }
  function setView(next) {
    view = next;
    world().lessonView(next);
    if (next === 'top') seen.add(kind + '-top');
    if (next === 'side') seen.add(kind + '-side');
    document.querySelectorAll('[data-view]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.view === next)));
  }
  function drawModel(next = kind, nextView = view) {
    kind = next;
    view = nextView;
    seen.add(kind);
    setWorld(true);
    world().learningRelief(kind, view);
    setView(view);
    $('lessonOverlay').innerHTML = `<strong>${models[kind][0]}</strong><small>학습용 모형 · 높이와 경사를 강조했어요${id === 1 ? ' · 해안 특징을 보여 주는 대표 구간' : ''}</small>`;
    $('worldLabel').textContent = '드래그로 회전 · 휠 또는 두 손가락으로 확대·축소';
    renderTools();
  }
  function renderTools() {
    world().lessonLabels.visible = flags.labels[kind] ?? kind === 'dokdo';
    world().flowArrows.visible = flags.flow;
    const tools = $('modelTools');
    if (!tools) return;
    tools.innerHTML = `<p>${models[kind][1]}</p>
      ${['mountain', 'dokdo'].includes(kind) ? `<label><input id="labelToggle" type="checkbox" ${world().lessonLabels.visible ? 'checked' : ''}> 이름표 표시</label>` : ''}
      ${kind === 'river' ? `<label><input id="flowToggle" type="checkbox" ${flags.flow ? 'checked' : ''}> 상류 → 하류 흐름 화살표</label>` : ''}
      ${id === 1 ? '<div class="coast-criteria"><b>비교 기준</b><ul><li>해안선이 얼마나 굽어 있나요?</li><li>섬이 몇 개 보이고 어디에 모여 있나요?</li></ul></div>' : ''}
      ${id === 1 ? `<small>${link(atlas, '해안 특징 자료 · 국토지리정보원 국가지도집')}</small>` : ''}`;
    if ($('labelToggle')) $('labelToggle').onchange = e => {
      flags.labels[kind] = world().lessonLabels.visible = e.target.checked;
    };
    if ($('flowToggle')) $('flowToggle').onchange = e => {
      flags.flow = world().flowArrows.visible = e.target.checked;
    };
  }
  function shell(content) {
    $('panel').innerHTML = `<div class="lesson-panel"><span class="tag">${id + 1}차시</span>${content}</div>`;
    $('panel').scrollTop = 0;
  }
  function bindModels() {
    document.querySelectorAll('[data-model]').forEach(button => button.onclick = () => {
      drawModel(button.dataset.model, view);
      document.querySelectorAll('[data-model]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    });
  }
  function setFeedback(message, wrong = false) {
    $('lessonFeedback').textContent = message;
    $('lessonFeedback').classList.toggle('wrong', wrong);
  }
  function phaseSaved(value) {
    const s = app.state();
    s.lessonProgress ??= [0, 0, 0, 0];
    s.lessonProgress[id] = Math.max(s.lessonProgress[id] || 0, value);
    s.missions[id] = Math.max(s.missions[id], value);
    app.save();
  }
  function renderObservation(review = false) {
    const heading = id === 3 ? '독도 모형 다시 보기' : '3D 지형을 관찰해요';
    shell(`<h2>${heading}</h2>${modelButtons()}<div id="modelTools"></div>
      ${id >= 2 ? '<button id="photosReview">사진·설명 자료</button>' : ''}
      <p id="lessonFeedback" class="feedback" role="status"></p>
      <button id="toLessonMap" class="primary">${review ? '원래 활동으로 돌아가기' : '관찰 마치고 지도 미션으로 →'}</button>
      ${!review && app.state().lessonProgress?.[id] >= 1 ? '<button id="resumeLesson">이어서 하기</button>' : ''}`);
    const showDefault = id === 1 ? 'top' : 'angle';
    drawModel(kind, review ? view : showDefault);
    bindModels();
    action('photosReview', showPhotos);
    action('resumeLesson', resume);
    action('toLessonMap', () => {
      if (review) {
        if (id === 3) renderGuardian();
        else if (phase >= tasks[id].length) renderWorksheet();
        else renderMission();
        return;
      }
      const missing = groups[id].filter(key => !seen.has(key) || (id === 1 && !seen.has(key + '-top')));
      if (missing.length) {
        setFeedback(`${missing.map(key => models[key][0]).join('·')}도 ${id === 1 ? '위에서 ' : ''}살펴봐요.`, true);
        return;
      }
      phaseSaved(1);
      renderMission();
    });
  }

  function mapSources(codes) {
    const sources = [...codes].filter(key => key !== 'v').map(key => link(places[key][3], places[key][2]));
    return `<details class="map-sources"><summary>지도 위치 자료</summary>${sources.join(' · ')}</details>`;
  }
  function showMap(codes, options, header, milestones = false) {
    setWorld(false);
    $('lessonStage').innerHTML = `<div class="lesson-stage-inner"><h2>${header}</h2>
      ${milestones ? `<nav class="map-zoom" aria-label="지도 범위">${['우리나라 전체', '동해 주변 확대', '울릉도·독도 확대'].map((label, i) =>
        `<button type="button" data-map-zoom="${i}" aria-pressed="${i === zoom}" ${i > zoom + 1 ? 'disabled' : ''}>${label}</button>`).join('')}</nav>` : ''}
      ${mapMarkup(codes, options)}
      ${options.river ? '<p class="map-caption">초록선은 동쪽 산지의 일부, 파란선은 하천의 물길이에요.</p>' : ''}
      ${options.distribution ? `<p class="map-caption">${link('https://nationalatlas.ngii.go.kr/pages/page_3806.php', '하천 분포 자료 · 국토지리정보원 국가지도집')}</p>` : ''}
      ${mapSources(codes)}</div>`;
    $('worldLabel').textContent = '';
  }
  function bindMapZoom(redraw, requireSequence = false) {
    document.querySelectorAll('[data-map-zoom]').forEach(button => button.onclick = () => {
      zoom = Number(button.dataset.mapZoom);
      if (zoom === 2) seen.add('islands-close');
      redraw();
    });
    if (requireSequence && !seen.has('islands-close')) {
      const full = document.querySelector('[data-map-zoom="2"]');
      full.disabled = zoom === 0;
    }
  }
  function resume() {
    phase = Math.min(tasks[id].length, app.state().lessonProgress[id] - 1);
    answered = false;
    if (id === 2 && phase > 0) {
      zoom = 2;
      seen.add('islands-close');
    }
    phase === tasks[id].length ? renderWorksheet() : renderMission();
  }
  function renderDokdoMapIntro() {
    shell(`<h2>지도에서 독도 찾아보기</h2><p>우리나라 전체 지도를 보고 동해 주변으로 확대해요. 울릉도·독도 주변까지 확대해 두 섬을 살펴보고 방위표에서 북쪽을 확인해요.</p>
      <p id="lessonFeedback" class="feedback" role="status"></p>
      <button id="toLessonMap" class="primary">관찰 마치고 지도 미션으로 →</button>
      ${app.state().lessonProgress?.[id] >= 1 ? '<button id="resumeLesson">이어서 하기</button>' : ''}`);
    const redraw = () => {
      showMap('uv', { zoom }, '우리나라 지도에서 독도까지', true);
      bindMapZoom(redraw, true);
    };
    redraw();
    action('toLessonMap', () => {
      if (!seen.has('islands-close')) {
        setFeedback('동해 주변을 거쳐 울릉도·독도 주변까지 차례로 확대해요.', true);
        return;
      }
      phaseSaved(1);
      renderMission();
    });
    action('resumeLesson', resume);
  }
  function renderMission() {
    const task = tasks[id][phase];
    if (task.model && !answered) kind = task.model;
    shell(`<p class="lesson-kicker">미션 ${phase + 1} / ${tasks[id].length}</p><h2>${task.title}</h2>
      ${task.map && !task.choices ? `<p>지도 기호나 아래의 지점 버튼을 골라요.</p><div class="options">${[...task.map].map((code, i) =>
        `<button data-map-choice="${code}">${i + 1}. ${places[code][2]}</button>`).join('')}</div>` : ''}
      ${task.choices ? `<div class="options">${task.choices.map((choice, i) => `<button data-choice="${i}">${choice}</button>`).join('')}</div>` : ''}
      ${id === 1 ? '<p class="sentence-frame">나는 ___을 보고 ___해안이라고 판단했어.</p>' : ''}
      <div id="lessonFeedback" class="feedback" role="status"></div>
      <div class="row"><button id="lessonHint">힌트</button><button id="reviewModel">3D 다시 보기</button>
      ${id === 2 ? '<button id="photosReview">사진·설명 자료</button>' : ''}
      <button id="nextLessonTask" class="primary" hidden>다음 →</button></div>`);
    function redraw() {
      if (task.map) {
        showMap(task.map, { zoom: task.zoom ? zoom : 0, river: task.river, pick: !task.choices,
          arrows: task.river && answered && phase === 3 }, task.zoom ? '울릉도와 독도는 어디에 있을까요?' : '우리나라에서 위치 찾기', task.zoom);
        bindMapZoom(redraw);
      } else if (task.review === 'photos') {
        setWorld(false);
        $('lessonStage').innerHTML = `<div class="lesson-stage-inner">${photoContent()}</div>`;
      } else {
        drawModel(kind, id === 1 ? 'top' : 'angle');
      }
      document.querySelectorAll('[data-map-choice]').forEach(b => b.onclick = () => checkAnswer(b.dataset.mapChoice));
    }
    function checkAnswer(answer) {
      if (answered) return;
      if (task.zoom && phase === 1 && zoom < 2) {
        setFeedback('동해 주변을 거쳐 울릉도·독도 주변까지 차례로 확대해요.', true);
        return;
      }
      if (answer !== task.answer) {
        status = task.hint;
        setFeedback(status, true);
        return;
      }
      answered = true;
      status = '✓ ' + task.success;
      phaseSaved(phase + 2);
      redraw();
      restoreStatus();
    }
    function restoreStatus() {
      setFeedback(status, Boolean(status) && !answered);
      $('nextLessonTask').hidden = !answered;
      if (answered) document.querySelectorAll('[data-choice],[data-map-choice]').forEach(b => b.disabled = true);
    }
    redraw();
    restoreStatus();
    document.querySelectorAll('[data-choice]').forEach(b => b.onclick = () => checkAnswer(Number(b.dataset.choice)));
    action('lessonHint', () => { if (!answered) { status = task.hint; setFeedback(status, true); } });
    action('reviewModel', () => renderObservation(true));
    action('photosReview', showPhotos);
    action('nextLessonTask', () => {
      phase++;
      status = '';
      answered = false;
      if (phase === tasks[id].length) renderWorksheet();
      else renderMission();
    });
  }

  function photoContent() {
    const license = link('https://creativecommons.org/licenses/by-sa/3.0/', 'CC BY-SA 3.0');
    const photo = (original, alt, caption, author, page) => `<figure>
      <img src="${original}" data-reference-photo alt="${alt}" width="533" height="345">
      <figcaption>${caption}<br><small>${link(page, author + ' · Wikimedia Commons')} · ${license}</small></figcaption>
    </figure>`;
    return `<div class="photo-material"><h2>독도 사진·설명 자료</h2>
      <div class="photo-grid">${photo('https://upload.wikimedia.org/wikipedia/commons/5/5e/Dokdo_Photo.jpg',
        '바다에서 바라본 독도. 왼쪽에 동도, 오른쪽에 서도가 보인다.',
        '바다에서 바라본 독도. 왼쪽이 동도, 오른쪽이 서도예요.', 'Rachouette',
        'https://commons.wikimedia.org/wiki/File:Dokdo_Photo.jpg')}
      ${photo('https://upload.wikimedia.org/wikipedia/commons/e/ee/Dokdo.jpg',
        '독도 바위에 갈매기가 쉬고 있고 뒤쪽 섬이 바다 안개에 가려져 있다.',
        '바위 위에 갈매기가 있고, 뒤쪽 섬에는 안개가 끼어 있어요.', 'Sokyo Park',
        'https://commons.wikimedia.org/wiki/File:Dokdo.jpg')}</div>
      <article><h3>기후와 생물</h3><p>독도 주변에 안개가 자주 끼고 겨울에는 눈이 내려요. 바위 지대에서 자라는 해국이 있고, 괭이갈매기와 바다제비도 볼 수 있어요.</p>
      <small>${link(nature, '설명 자료 · 외교부 독도 자연환경')} · ${link(location, '외교부 독도 구성 및 위치')}</small></article></div>`;
  }
  function showPhotos() { app.dialog(photoContent()); }
  document.addEventListener('error', event => {
    const image = event.target;
    if (!image.hasAttribute?.('data-reference-photo')) return;
    image.replaceWith(Object.assign(document.createElement('p'), {
      textContent: '사진을 불러오지 못했어요. 아래 사진 출처에서 확인할 수 있어요.'
    }));
  }, true);
  function renderWorksheet() {
    const sheet = worksheets[id];
    shell(`<h2>${sheet.title}</h2><ol class="activity-steps">${sheet.list.map(item => `<li>${item}</li>`).join('')}</ol>
      ${id === 1 ? '<table class="coast-sheet"><thead><tr><th>해안</th><th>해안선 모양</th><th>섬의 분포</th></tr></thead><tbody><tr><th>동해안</th><td></td><td></td></tr><tr><th>서해안</th><td></td><td></td></tr><tr><th>남해안</th><td></td><td></td></tr></tbody></table>' : ''}
      <label for="lessonNoteText">${sheet.label}</label><textarea id="lessonNoteText" maxlength="1200" placeholder="${sheet.placeholder}">${esc(app.state().notes[id])}</textarea>
      <div class="row"><button id="reviewModel">3D 다시 보기</button>
      ${id === 2 ? '<button id="photosReview">사진·설명 자료</button>' : ''}
      <button id="finishLesson" class="primary">기록 저장 · 보상 받기</button></div>`);
    if (id === 2) showMap('uv', { zoom: 2 }, '소개 카드에 그릴 작은 지도', false);
    else showMap(id === 0 ? 'abcd' : 'efg', { river: id === 0, arrows: id === 0, distribution: id === 0 }, '활동지에 옮길 때 살펴봐요');
    $('lessonNoteText').oninput = event => { app.state().notes[id] = event.target.value; app.save(); };
    action('reviewModel', () => renderObservation(true));
    action('photosReview', showPhotos);
    action('finishLesson', () => {
      const note = $('lessonNoteText').value.trim();
      if (!note) return app.toast('활동지에 옮길 관찰 내용을 먼저 적어요.');
      reward(note);
    });
  }
  function reward(note) {
    const s = app.state();
    s.notes[id] = note;
    s.done[id] = true;
    s.missions[id] = 5;
    app.save();
    shell(`<h2>탐험 완료!</h2>${guide('발견한 내용을 기록했구나. 마을에 새 장식을 놓아 봐!')}
      <article><h3>${app.rewards[id]} 획득</h3><p class="reward-note">${esc(note)}</p></article>
      <button id="rewardHome" class="primary">마을에 장식 놓기</button>`);
    action('rewardHome', app.toGarden);
  }

  function printCard(blank) {
    const printable = $('lessonPrint');
    printable.innerHTML = `<h1>독도 지킴이 카드</h1><p class="print-name">5학년 ____반 ____번 &nbsp;&nbsp; 이름 ____________________</p>
      <p>모둠 독도 자연환경 소개 카드를 참고해 나의 카드를 완성해요.</p>
      ${guardianFields.map(([key, label, prompt]) => `<section><h2>${label}</h2><p>${prompt}</p>
        <div class="print-answer">${blank ? '' : esc(cardDraft[key] || '')}</div></section>`).join('')}
      <section><h2>짝과 바꾸어 읽고 보완해요</h2><ul>${checks.map(item => `<li>□ ${item}</li>`).join('')}</ul>
      <p>보완할 점 ________________________________________________________</p></section>`;
    printable.hidden = false;
    document.body.classList.add('print-lesson');
    const cleanup = () => {
      printable.hidden = true;
      document.body.classList.remove('print-lesson');
    };
    window.addEventListener('afterprint', cleanup, { once: true });
    window.print();
  }
  function renderGuardian() {
    shell(`<h2>독도 지킴이 카드</h2><p>3차시 모둠 소개 카드를 참고해 나만의 카드를 만들어요.</p>
      <div class="row"><button id="guardianMap">독도 지도</button><button id="reviewModel">독도 3D 지형</button><button id="photosReview">사진·설명 자료</button></div>
      ${guardianFields.map(([key, label, prompt]) => `<label for="guardian-${key}">${label}</label><p class="field-hint">${prompt}</p>
        <textarea id="guardian-${key}" data-guardian="${key}" maxlength="240">${esc(cardDraft[key] || '')}</textarea>`).join('')}
      <fieldset><legend>짝과 바꾸어 읽고 보완해요</legend>${checks.map((label, i) =>
        `<label><input type="checkbox" data-peer="${i}" ${cardDraft.peer[i] ? 'checked' : ''}> ${label}</label>`).join('')}</fieldset>
      <div class="row"><button id="printBlank">빈 카드 출력</button><button id="printFilled">작성한 카드 출력</button>
      <button id="finishGuardian" class="primary">카드 저장 · 보상 받기</button></div>`);
    function guardianMap() {
      showMap('uv', { zoom }, '울릉도와 독도의 위치', true);
      bindMapZoom(guardianMap);
    }
    guardianMap();
    action('guardianMap', guardianMap);
    action('reviewModel', () => renderObservation(true));
    action('photosReview', showPhotos);
    const saveDraft = () => { app.state().guardianCard = cardDraft; app.save(); };
    document.querySelectorAll('[data-guardian]').forEach(input => input.oninput = () => {
      cardDraft[input.dataset.guardian] = input.value;
      saveDraft();
    });
    document.querySelectorAll('[data-peer]').forEach(input => input.onchange = () => {
      cardDraft.peer[Number(input.dataset.peer)] = input.checked;
      saveDraft();
    });
    action('printBlank', () => printCard(true));
    action('printFilled', () => printCard(false));
    action('finishGuardian', () => {
      if (guardianFields.some(([key]) => !cardDraft[key]?.trim())) return app.toast('카드의 세 칸을 모두 채워요.');
      if (cardDraft.peer.length !== checks.length || !checks.every((_, i) => cardDraft.peer[i]))
        return app.toast('짝과 읽고 세 항목을 확인해요.');
      saveDraft();
      reward(guardianFields.map(([key, label]) => label + '\n' + cardDraft[key].trim()).join('\n\n'));
    });
  }

  function enter(index) {
    const s = app.state();
    if (index >= s.unlocked) return;
    app.setCurrent(index);
    id = index;
    phase = 0;
    answered = false;
    status = '';
    zoom = 0;
    kind = groups[id][0];
    view = id === 1 ? 'top' : 'angle';
    seen = new Set();
    flags = { labels: {}, flow: false };
    $('world').classList.add('lesson-world');
    world().placing = false;
    world().keys.clear();
    world().clear();
    world().mode = 'lesson-map';
    $('eyebrow').textContent = (id + 1) + '차시';
    $('mapBox').hidden = $('walkControls').hidden = $('interact').hidden = true;
    app.setHeading(app.titles[id], ['산지 높이와 물길', '해안선 모양과 섬의 분포', '두 섬의 위치와 자연환경', '자료를 바탕으로 실천 카드 만들기'][id]);
    if (id === 3) {
      const draft = s.guardianCard;
      cardDraft = { ...(draft || {}), peer: checks.map((_, i) => Boolean(draft?.peer?.[i])) };
      renderGuardian();
    } else if (id === 2) renderDokdoMapIntro();
    else renderObservation();
  }
  document.querySelectorAll('[data-view]').forEach(button => button.onclick = () => setView(button.dataset.view));
  $('resetCamera').addEventListener('click', () => {
    if (world()?.mode === 'lesson') setView('angle');
  });
  return { enter, close };
};
