const STORAGE_KEY = "rewardloop-v2";

const defaultState = {
  screen: "home",
  points: 7420,
  pending: 1830,
  today: 1240,
  lifetime: 7420,
  dailyClaimed: false,
  tx: [
    ["Demo offer completed", 1250],
    ["Demo offer completed", 500],
    ["Welcome demo balance", 5670]
  ]
};

let state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultState;

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function money(points) {
  return "$" + (points / 1000).toFixed(2);
}

function points(amount) {
  return Number(amount).toLocaleString() + " pts";
}

function render() {
  const screen = document.getElementById("screen");

  if (state.screen === "home") {
    screen.innerHTML = homeScreen();
  } else if (state.screen === "earn") {
    screen.innerHTML = earnScreen();
  } else if (state.screen === "wallet") {
    screen.innerHTML = walletScreen();
  } else if (state.screen === "account") {
    screen.innerHTML = accountScreen();
  }

  setupButtons();

  document.querySelectorAll("#nav button").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.nav === state.screen
    );
  });
}

function setupButtons() {
  document.querySelectorAll("[data-nav]").forEach(button => {
    button.onclick = () => {
      state.screen = button.dataset.nav;
      save();
      render();
    };
  });

  document.querySelectorAll("[data-action]").forEach(button => {
    button.onclick = handleAction;
  });
}

/* ---------------- HOME ---------------- */

function homeScreen() {
  return `
    <h1>Welcome back 👋</h1>

    <p class="sub">
      Keep earning rewards, track your progress, and manage everything in one place.
    </p>

    <div class="balance">
      <div class="label">AVAILABLE BALANCE</div>

      <div class="amount">${money(state.points)}</div>

      <div class="pending">
        ${money(state.pending)} pending
      </div>

      <br>

      <button class="btn white full" data-action="earn">
        ✦ EARN REWARDS
      </button>
    </div>

    <div class="stats">
      <div class="stat">
        <span>TODAY</span>
        <b>${money(state.today)}</b>
      </div>

      <div class="stat">
        <span>LIFETIME</span>
        <b>${money(state.lifetime)}</b>
      </div>
    </div>

    <div class="section">
      <b>Quick earn</b>
      <span class="navlink" data-nav="earn">See all</span>
    </div>

    <div class="card offer">
      <div class="icon">🎁</div>

      <div class="offermain">
        <b>Daily bonus</b>
        <p>Claim your free daily demo reward</p>
      </div>

      ${
        state.dailyClaimed
          ? `<span class="pill">CLAIMED</span>`
          : `<button class="btn blue" data-action="daily">+100</button>`
      }
    </div>

    <div class="card offer" style="margin-top:12px;">
      <div class="icon">⭐</div>

      <div class="offermain">
        <b>Demo activity</b>
        <p>Complete a demo activity</p>
      </div>

      <span class="reward">+250 pts</span>
    </div>

    <div class="notice">
      <b>RewardLoop is free.</b><br>
      This prototype has no advertisements, no purchases,
      and no real-money payouts. Rewards shown here are demo points.
    </div>
  `;
}

/* ---------------- EARN ---------------- */

function earnScreen() {
  return `
    <h2>Earn Rewards</h2>

    <p class="sub">
      Complete activities to test how the RewardLoop earning system works.
    </p>

    <div class="card offer">
      <div class="icon">🎁</div>

      <div class="offermain">
        <b>Demo Activity</b>
        <p>Complete this activity to test rewards.</p>
        <span class="reward">+250 pts</span>
      </div>

      <button class="btn blue" data-action="complete">
        Start
      </button>
    </div>

    <div class="card offer" style="margin-top:12px;">
      <div class="icon">📋</div>

      <div class="offermain">
        <b>Surveys</b>
        <p>Reward surveys will be added later.</p>
      </div>

      <span class="pill">SOON</span>
    </div>

    <div class="card offer" style="margin-top:12px;">
      <div class="icon">🎮</div>

      <div class="offermain">
        <b>Games & Activities</b>
        <p>More ways to earn are coming.</p>
      </div>

      <span class="pill">SOON</span>
    </div>

    <div class="card offer" style="margin-top:12px;">
      <div class="icon">🎯</div>

      <div class="offermain">
        <b>Daily Challenge</b>
        <p>Complete one challenge every day.</p>
      </div>

      ${
        state.dailyClaimed
          ? `<span class="pill">DONE</span>`
          : `<button class="btn blue" data-action="daily">Claim</button>`
      }
    </div>

    <div class="notice">
      <b>Coming later:</b><br>
      Real reward partners can only be connected after we build
      secure accounts, server-side tracking, fraud protection,
      and a legitimate payout system.
    </div>
  `;
}

/* ---------------- WALLET ---------------- */

function walletScreen() {
  return `
    <h2>Your Wallet</h2>

    <div class="balance">
      <div class="label">AVAILABLE</div>

      <div class="amount">${money(state.points)}</div>

      <div class="pending">
        ${money(state.pending)} pending
      </div>
    </div>

    <div class="stats">
      <div class="stat">
        <span>AVAILABLE</span>
        <b>${money(state.points)}</b>
      </div>

      <div class="stat">
        <span>PENDING</span>
        <b>${money(state.pending)}</b>
      </div>
    </div>

    <div class="section">
      <b>Recent activity</b>
    </div>

    <div class="card">
      ${
        state.tx.length === 0
          ? `<p class="sub">No activity yet.</p>`
          : state.tx.map(transaction => `
              <div class="tx row">
                <span>${transaction[0]}</span>
                <span class="reward">
                  ${transaction[1] > 0 ? "+" : ""}
                  ${points(transaction[1])}
                </span>
              </div>
            `).join("")
      }
    </div>

    <div class="notice">
      <b>Demo wallet</b><br>
      These balances are for testing only. No real money is stored
      or transferred by this prototype.
    </div>
  `;
}

/* ---------------- ACCOUNT ---------------- */

function accountScreen() {
  return `
    <h2>Account</h2>

    <div class="card">
      <div class="row">
        <div>
          <b>RewardLoop Member</b>
          <p class="sub">Demo account</p>
        </div>

        <div class="icon">👤</div>
      </div>
    </div>

    <div class="card" style="margin-top:12px;">
      <div class="row">
        <b>Profile</b>
        <span>›</span>
      </div>

      <hr>

      <div class="row">
        <b>Notifications</b>
        <span>›</span>
      </div>

      <hr>

      <div class="row">
        <b>Privacy</b>
        <span>›</span>
      </div>

      <hr>

      <div class="row">
        <b>Terms</b>
        <span>›</span>
      </div>
    </div>

    <div class="card" style="margin-top:12px;">
      <b>❤️ Support RewardLoop</b>

      <p class="sub">
        RewardLoop is designed to remain free with no forced
        advertisements and no pay-to-win features.
      </p>

      <button class="btn blue full" data-action="support">
        Support the Developer
      </button>
    </div>

    <div class="card" style="margin-top:12px;">
      <b>About RewardLoop</b>

      <p class="sub">
        Earn. Track. Reward.<br>
        Built as a free community-supported project.
      </p>
    </div>

    <button class="btn full" data-action="reset">
      Reset Demo Data
    </button>

    <div class="notice">
      Version 2 prototype
    </div>
  `;
}

/* ---------------- ACTIONS ---------------- */

function handleAction(event) {
  const action = event.currentTarget.dataset.action;

  if (action === "earn") {
    state.screen = "earn";
  }

  if (action === "complete") {
    state.points += 250;
    state.today += 250;
    state.lifetime += 250;

    state.tx.unshift([
      "Demo activity completed",
      250
    ]);

    alert("Great! You earned 250 demo points.");
  }

  if (action === "daily") {
    if (state.dailyClaimed) {
      alert("You already claimed today's demo bonus.");
      return;
    }

    state.points += 100;
    state.today += 100;
    state.lifetime += 100;
    state.dailyClaimed = true;

    state.tx.unshift([
      "Daily demo bonus",
      100
    ]);

    alert("Daily bonus claimed! +100 demo points.");
  }

  if (action === "support") {
    alert(
      "Thank you for supporting RewardLoop! ❤️\n\n" +
      "We'll add the official support/donation page here later."
    );
  }

  if (action === "reset") {
    if (confirm("Reset all demo data?")) {
      state = {
        ...defaultState,
        tx: [...defaultState.tx]
      };
    }
  }

  save();
  render();
}

render();
