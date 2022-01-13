const State = {
  IDLE: 0,
  LOADING: 1
};

const Activity = {
  data() {
    return {
      currentState: State.IDLE,
      currentActivity: "Loading suggestion ..",
      previousActivity: undefined,
      history: [],
      maxHistoryLength: 5
    }
  },

  mounted() {
    this.loadActivity();
  },

  methods: {
    //
    // Load a new suggestion from the API.
    // If successful, set the loaded activity.
    //
    loadActivity() {
      if (this.currentState === State.IDLE) {
        if (this.previousActivity) this.addToHistory(this.currentActivity);
        this.currentActivity = "Loading suggestion ..";

        this.currentState = State.LOADING;
        fetch("https://www.boredapi.com/api/activity")
          .then(response => response.json())
          .then(data => {
            this.setActivity(data.activity);
            this.currentState = State.IDLE;
          });
        }
    },

    //
    // Set the previous activity, and change 
    // the current activity text.
    //
    setActivity(activity) {
      this.previousActivity = this.currentActivity;
      this.currentActivity = activity;
    },

    //
    // Add the previous suggestions to the history.
    //
    addToHistory(activity) {
      this.history.unshift(activity);
      if (this.history.length > this.maxHistoryLength) this.history.pop();
    }
  }
}

Vue.createApp(Activity).mount('#activity');
