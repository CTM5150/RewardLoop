    </div>

    <div class="section">
      <b>💵 Cash Out</b>
    </div>

    <div class="card">
      <div class="row">
        <div>
          <b>Available to withdraw</b>
          <p class="sub">
            Your current available demo balance.
          </p>
        </div>

        <strong class="reward">
          ${money(state.points)}
        </strong>
      </div>

      <div class="payout-options">

        <div class="payout-option">
          <div class="payout-icon">P</div>
          <div>
            <b>PayPal</b>
            <small>Demo payout method</small>
          </div>
          <span>›</span>
        </div>

        <div class="payout-option">
          <div class="payout-icon">🎁</div>
          <div>
            <b>Gift Card</b>
            <small>Demo payout method</small>
          </div>
          <span>›</span>
        </div>

      </div>

      <button class="btn blue full" disabled>
        Request Cash Out
      </button>

      <p class="sub cashout-note">
        Cash-out is currently a prototype feature.
        No real money is transferred.
      </p>
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
      These balances are for testing only. No real money is stored,
      transferred, or available for withdrawal in this prototype.
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

function handleAction(action) {
  if (action === "daily") {
    if (state.dailyClaimed) {
      alert("🔥 Daily reward already claimed!");
      return;
    }

    state.points += 100;
    state.today += 1;
    state.lifetime = state.points;
    state.dailyClaimed = true;

    state.tx.unshift([
      "Daily challenge completed",
      100
    ]);

    save();
    render();

    alert("🎉 Daily reward claimed! You earned 100 points.");
    return;
  }

  if (action === "demo") {
    state.points += 250;
    state.today += 0.25;
    state.lifetime = state.points;

    state.tx.unshift([
      "Demo activity completed",
      250
    ]);

    save();
    render();

    alert("🎁 Demo activity completed! You earned 250 points.");
    return;
  }
if (action === "earn") {
    state.screen = "earn";
    save();
    render();
    return;
}
  if (action === "cashout") {
    alert("💰 Cash-out is currently a prototype feature. No real money is transferred.");
    return;
  }
}
render();      <button class="btn white full" data-action="earn">
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
  const achievementCount =
    Object.values(state.achievements).filter(Boolean).length;

  return `
    <h2>Earn Rewards</h2>

    <p class="sub">
      Complete activities, build your streak, and unlock achievements.
    </p>

    <div class="stats">
      <div class="stat">
        <span>🔥 STREAK</span>
        <b>${state.streak} day${state.streak === 1 ? "" : "s"}</b>
      </div>

      <div class="stat">
        <span>🏆 ACHIEVEMENTS</span>
        <b>${achievementCount}/4</b>
      </div>
    </div>

    <div class="card">
      <div class="row">
        <div>
          <b>🔥 Daily Challenge</b>
          <p class="sub">
            Claim your daily reward and keep your streak alive.
          </p>
        </div>

        ${
          state.dailyClaimed
            ? `<span class="pill">CLAIMED</span>`
            : `<button class="btn blue" data-action="daily">+100</button>`
        }
      </div>
    </div>

    <div class="card offer" style="margin-top:12px;">
      <div class="icon">🎁</div>

      <div class="offermain">
        <b>Demo Activity</b>
        <p>Complete this activity and receive demo points.</p>
        <span class="reward">+250 pts</span>
      </div>

      <button class="btn blue" data-action="demo">
    Start
</button>
    </div>

    <div class="card" style="margin-top:12px;">
      <b>📈 Your Progress</b>

      <p class="sub">
        ${state.completedActivities} of 5 activities completed
      </p>

      <div class="progress">
        <div
          class="progress-bar"
          style="width:${Math.min(
            state.completedActivities * 20,
            100
          )}%"
        ></div>
      </div>
    </div>

    <div class="section">
      <b>🏆 Achievements</b>
    </div>

    <div class="card">
      <div class="row">
        <span>⭐ First Reward</span>
        ${
          state.achievements.firstReward
            ? `<span class="pill">UNLOCKED</span>`
            : `<span>🔒</span>`
        }
      </div>

      <hr>

      <div class="row">
        <span>💰 Earn 1,000 Points</span>
        ${
          state.achievements.thousandPoints
            ? `<span class="pill">UNLOCKED</span>`
            : `<span>🔒</span>`
        }
      </div>

      <hr>

      <div class="row">
        <span>🎯 Complete 5 Activities</span>
        ${
          state.achievements.fiveActivities
            ? `<span class="pill">UNLOCKED</span>`
            : `<span>🔒</span>`
        }
      </div>

      <hr>

      <div class="row">
        <span>🔥 7 Day Streak</span>
        ${
          state.achievements.sevenDayStreak
            ? `<span class="pill">UNLOCKED</span>`
            : `<span>🔒</span>`
        }
      </div>
    </div>

    <div class="notice">
      <b>Demo rewards only</b><br>
      RewardLoop currently uses demonstration points.
      There are no advertisements, purchases, or real-money payouts.
    </div>
  `;
}

/* ---------------- WALLET ---------------- */

function walletScreen() {
  return `
    <h2>Your Wallet</h2>

    <p class="sub">
      Track your available rewards, pending earnings, and activity.
    </p>

    <div class="balance">
      <div class="label">AVAILABLE BALANCE</div>
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
      <b>💵 Cash Out</b>
    </div>

    <div class="card">
      <div class="row">
        <div>
          <b>Available to withdraw</b>
          <p class="sub">
            Your current available demo balance.
          </p>
        </div>

        <strong class="reward">
          ${money(state.points)}
        </strong>
      </div>

      <div class="payout-options">

        <div class="payout-option">
          <div class="payout-icon">P</div>
          <div>
            <b>PayPal</b>
            <small>Demo payout method</small>
          </div>
          <span>›</span>
        </div>

        <div class="payout-option">
          <div class="payout-icon">🎁</div>
          <div>
            <b>Gift Card</b>
            <small>Demo payout method</small>
          </div>
          <span>›</span>
        </div>

      </div>

      <button class="btn blue full" disabled>
        Request Cash Out
      </button>

      <p class="sub cashout-note">
        Cash-out is currently a prototype feature.
        No real money is transferred.
      </p>
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
      These balances are for testing only. No real money is stored,
      transferred, or available for withdrawal in this prototype.
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

}
    <div class="notice">
      Version 2 prototype
    </div>
  `;
}

/* ---------------- ACTIONS ---------------- */

function handleAction(action) {
  if (action === "daily") {
    if (state.dailyClaimed) {
      alert("🔥 Daily reward already claimed!");
      return;
    }

    state.points += 100;
    state.today += 1;
    state.lifetime = state.points;
    state.dailyClaimed = true;

    state.tx.unshift([
      "Daily challenge completed",
      100
    ]);

    save();
    render();

    alert("🎉 Daily reward claimed! You earned 100 points.");
    return;
  }

  if (action === "demo") {
    state.points += 250;
    state.today += 0.25;
    state.lifetime = state.points;

    state.tx.unshift([
      "Demo activity completed",
      250
    ]);

    save();
    render();

    alert("🎁 Demo activity completed! You earned 250 points.");
    return;
  }
if (action === "earn") {
    state.screen = "earn";
    save();
    render();
    return;
  if (action === "cashout") {
    alert("💰 Cash-out is currently a prototype feature. No real money is transferred.");
    return;
  }
}
render();
