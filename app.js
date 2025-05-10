const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock data - In a real app, this would come from a database
const athleteData = {
  profile: {
    name: 'Newlove Kofi Etsibah',
    age: 16,
    country: 'Liberia',
    category: 'Under-17',
    specialties: ['100m Sprint', '200m Sprint', '4x100m Relay'],
  },
  personalBest: {
    '100m': '10.85s',
    '200m': '21.92s',
    '4x100m Relay': '41.23s'
  },
  recentAchievements: [
    {
      title: 'National Junior Championship',
      event: '100m Sprint',
      medal: 'Gold',
      date: 'March 2025'
    },
    {
      title: 'West African Youth Games',
      event: '200m Sprint',
      medal: 'Silver',
      date: 'February 2025'
    },
    {
      title: 'Regional School Championship',
      event: '4x100m Relay',
      medal: 'Gold',
      date: 'January 2025'
    }
  ],
  latestNews: [
    {
      title: 'New Personal Best in 100m',
      date: 'April 15, 2025',
      image: 'news1.jpg',
      excerpt: 'Achieved a remarkable time of 10.85s in the 100m sprint at the National Trials.'
    },
    {
      title: 'Selected for National Team',
      date: 'March 28, 2025',
      image: 'news2.jpg',
      excerpt: 'Chosen to represent Liberia in the upcoming African Youth Championships.'
    },
    {
      title: 'Training Camp Success',
      date: 'March 10, 2025',
      image: 'news3.jpg',
      excerpt: 'Completed an intensive training camp with top coaches from across Africa.'
    }
  ],
  gallery: [
    {
      id: 1,
      title: 'Championship Victory',
      image: 'victory.jpg',
      category: 'Competition',
      description: 'Winning the National Junior Championship'
    },
    {
      id: 2,
      title: 'Training Session',
      image: 'training.jpg',
      category: 'Training',
      description: 'Intense sprint practice session'
    },
    {
      id: 3,
      title: 'Medal Ceremony',
      image: 'medal.jpg',
      category: 'Awards',
      description: 'Receiving gold medal at regional championships'
    },
    {
      id: 4,
      title: 'Team Photo',
      image: 'team.jpg',
      category: 'Team',
      description: 'With the Liberian junior track team'
    },
    {
      id: 5,
      title: 'Team Photo',
      image: 'guy.jpg',
      category: 'Team',
      description: 'With the Liberian junior track team'
    },
    {
      id: 6,
      title: 'Before pratice',
      image: 'Befor.jpg',
      category: 'Training',
      description: 'After school'
    },
    {
      id: 7,
      title: 'Training Photo',
      image: 'training1.jpg',
      category: 'Training',
      description: 'With the Liberian junior track team'
    },
    {
      id: 8,
      title: 'Training Photo',
      image: 'guy.jpg',
      category: 'Training',
      description: 'With the Liberian junior track team'
    },
    {
      id: 9,
      title: 'Championship Victory',
      image: 'compention1.jpg',
      category: 'Competition',
      description: 'Winning the National Junior Championship'
    },
    {
      id: 10,
      title: 'Championship Victory',
      image: 'compention2.jpg',
      category: 'Competition',
      description: 'Winning the National Junior Championship'
    },
    {
      id: 11,
      title: 'Team Photo',
      image: 'team1.jpg',
      category: 'Team',
      description: 'With the Liberian junior track team'
    }
  ],
  upcomingEvents: [
    {
      id: 1,
      name: 'African Youth Championships',
      date: '2025-06-15',
      location: 'Monrovia, Liberia'
    }
  ],
  trainingSchedule: [
    {
      day: 'Monday',
      activities: ['Sprint Training', 'Strength Conditioning']
    },
    {
      day: 'Wednesday',
      activities: ['Technical Training', 'Endurance']
    },
    {
      day: 'Friday',
      activities: ['Competition Practice', 'Recovery']
    }
  ]
};

// Routes
app.get('/', (req, res) => {
  res.render('pages/index', {
    title: 'Home',
    athlete: {
      ...athleteData.profile,
      personalBest: athleteData.personalBest,
      recentAchievements: athleteData.recentAchievements,
      latestNews: athleteData.latestNews
    }
  });
});

app.get('/achievements', (req, res) => {
  res.render('pages/achievements', {
    title: 'Achievements',
    achievements: athleteData.recentAchievements
  });
});

app.get('/schedule', (req, res) => {
  res.render('pages/schedule', {
    title: 'Training Schedule',
    schedule: athleteData.trainingSchedule,
    events: athleteData.upcomingEvents
  });
});

app.get('/stats', (req, res) => {
  // Calculate total events from personal bests
  const totalEvents = Object.keys(athleteData.personalBest).length;
  
  // Prepare enhanced stats data
  const enhancedStats = {};
  for (const [event, time] of Object.entries(athleteData.personalBest)) {
    enhancedStats[event] = {
      pb: time,
      pbDate: '2025-04-15', // Example date
      sb: time, // Using PB as SB for now
      progressPercentage: 85, // Example percentage
      totalRaces: 12, // Example count
      medals: 3, // Example count
      averageTime: (parseFloat(time) + 0.3).toFixed(2) // Example average
    };
  }

  res.render('pages/stats', {
    title: 'Performance Statistics',
    stats: enhancedStats,
    totalEvents: totalEvents,
    totalMedals: 15, // Example total medals
    trainingHours: 420, // Example training hours
    prImprovements: 8, // Example PR improvements
    recoveryMetrics: {
      sleepQuality: 4, // Out of 5
      muscleRecovery: 85 // Percentage
    },
    goals: [
      {
        event: '100m Sprint',
        target: '10.5s',
        progress: 80
      },
      {
        event: '200m Sprint',
        target: '21.2s',
        progress: 75
      },
      {
        event: '400m Sprint',
        target: '48.5s',
        progress: 65
      }
    ]
  });
});

app.get('/gallery', (req, res) => {
  res.render('pages/gallery', {
    title: 'Photo Gallery',
    gallery: athleteData.gallery
  });
});

app.get('/contact', (req, res) => {
  res.render('pages/contact', {
    title: 'Contact Us'
  });
});

app.get('/news', (req, res) => {
  res.render('pages/news', {
    title: 'Latest News',
    news: athleteData.latestNews
  });
});

// API Routes for dynamic updates
app.post('/api/performance/add', (req, res) => {
  const { event, time, date } = req.body;
  // In a real app, save to database
  res.json({ success: true, message: 'Performance recorded' });
});

app.get('/api/performances/:event', (req, res) => {
  const event = req.params.event;
  // In a real app, fetch from database
  res.json({
    event,
    performances: [
      { date: '2025-05-01', time: '10.5s' },
      { date: '2025-04-15', time: '10.6s' }
    ]
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});