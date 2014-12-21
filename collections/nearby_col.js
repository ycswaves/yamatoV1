Nearby = new Meteor.Collection("nearby");

var NearBySchema = new SimpleSchema({
  propertyId: {
    type: String,
    label: "Property ID"
  },
  mart: {
    type: [Object],
    label: "Nearby supermarket",
    optional: true
  },
  food: {
    type: [Object],
    label: "Nearby restaurant and food court",
    optional: true
  },
  clinic: {
    type: [Object],
    label: "Nearby clinics",
    optional: true
  }
});

/* schema only for reference only, not applied */
// Nearby.attachSchema(NearBySchema);
