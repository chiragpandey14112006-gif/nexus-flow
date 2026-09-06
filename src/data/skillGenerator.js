// ─── Skill Graph Generator ───
// Generates a realistic skill decomposition for any CS/engineering goal.

const SKILL_TEMPLATES = {
  'web': {
    category: 'Web Development',
    color: '#00f0ff',
    skills: [
      { name: 'HTML & Semantic Markup', level: 'beginner', icon: '🏗️', est: '2 days',
        description: 'Master the building blocks of the web. Learn semantic HTML5 elements, accessibility best practices, and document structure.',
        project: 'Build a personal portfolio page using only semantic HTML — no divs allowed. Include proper ARIA roles and landmark regions.',
        resources: ['MDN HTML Guide', 'web.dev Learn HTML', 'A11y Project Checklist'] },
      { name: 'CSS Grid & Flexbox', level: 'beginner', icon: '📐', est: '3 days',
        description: 'Understand modern CSS layout systems. Master grid areas, flex alignment, responsive patterns, and container queries.',
        project: 'Recreate the Spotify desktop layout with CSS Grid for the main structure and Flexbox for component internals. Must be fully responsive.',
        resources: ['CSS Grid Garden', 'Flexbox Froggy', 'Every Layout'] },
      { name: 'JavaScript ES6+', level: 'intermediate', icon: '⚡', est: '1 week',
        description: 'Deep dive into modern JavaScript: destructuring, modules, async/await, generators, proxies, and the event loop.',
        project: 'Build a reactive state management library from scratch (like a mini MobX) using Proxies and the Observer pattern.',
        resources: ['JavaScript.info', 'You Don\'t Know JS', 'Eloquent JavaScript'] },
      { name: 'React Fundamentals', level: 'intermediate', icon: '⚛️', est: '1 week',
        description: 'Component architecture, hooks, state management, virtual DOM reconciliation, and React\'s rendering lifecycle.',
        project: 'Build a Kanban board (like Trello) with drag-and-drop, persistent state via localStorage, and optimistic UI updates.',
        resources: ['React.dev Docs', 'Epic React by Kent C. Dodds', 'React Patterns'] },
      { name: 'State Management', level: 'advanced', icon: '🔄', est: '4 days',
        description: 'Redux, Zustand, Jotai, or Recoil — understand when to use global vs local state, derived state, and state machines.',
        project: 'Implement a real-time collaborative text editor using CRDT-inspired state management with conflict resolution.',
        resources: ['Redux Toolkit Docs', 'XState Documentation', 'Jotai Recipes'] },
      { name: 'API Design & Integration', level: 'intermediate', icon: '🔌', est: '5 days',
        description: 'REST, GraphQL, WebSockets, server-sent events. Error handling, caching strategies, and optimistic updates.',
        project: 'Build a GitHub dashboard that uses the GitHub GraphQL API with infinite scroll, real-time notifications, and offline caching.',
        resources: ['GraphQL.org', 'TanStack Query Docs', 'HTTP Caching Guide'] },
      { name: 'Performance Optimization', level: 'advanced', icon: '🚀', est: '4 days',
        description: 'Code splitting, lazy loading, memoization, virtualization, Web Workers, and Core Web Vitals optimization.',
        project: 'Take a slow React app (provided) and optimize it to score 95+ on Lighthouse. Document every optimization with before/after metrics.',
        resources: ['web.dev Performance', 'React Profiler', 'Webpack Bundle Analyzer'] },
      { name: 'Testing & CI/CD', level: 'advanced', icon: '🧪', est: '4 days',
        description: 'Unit tests, integration tests, E2E with Playwright, snapshot testing, and continuous deployment pipelines.',
        project: 'Add comprehensive test coverage to your Kanban board: unit tests for reducers, integration tests for drag-drop, E2E for user flows.',
        resources: ['Testing Library Docs', 'Playwright Docs', 'GitHub Actions Guide'] },
    ]
  },
  'ml': {
    category: 'Machine Learning',
    color: '#a855f7',
    skills: [
      { name: 'Linear Algebra', level: 'beginner', icon: '📊', est: '1 week',
        description: 'Vectors, matrices, eigenvalues, SVD, and their applications in data transformations and dimensionality reduction.',
        project: 'Implement PCA from scratch in NumPy. Apply it to the MNIST dataset and visualize the principal components as images.',
        resources: ['3Blue1Brown Linear Algebra', 'MIT 18.06 Lectures', 'Coding the Matrix'] },
      { name: 'Probability & Statistics', level: 'beginner', icon: '🎲', est: '1 week',
        description: 'Bayesian thinking, distributions, hypothesis testing, MLE, MAP estimation, and information theory basics.',
        project: 'Build a Naive Bayes spam classifier from scratch. Compare its performance against scikit-learn\'s implementation on the SpamAssassin dataset.',
        resources: ['StatQuest YouTube', 'Think Stats', 'Probability for CS (Stanford CS109)'] },
      { name: 'Python for Data Science', level: 'beginner', icon: '🐍', est: '5 days',
        description: 'NumPy, Pandas, Matplotlib, and Seaborn. Efficient data manipulation, vectorized operations, and publication-quality visualizations.',
        project: 'Perform a complete EDA on a real-world dataset (WHO Global Health). Create an interactive dashboard with Plotly.',
        resources: ['Python Data Science Handbook', 'Pandas Documentation', 'Kaggle Learn'] },
      { name: 'Classical ML Algorithms', level: 'intermediate', icon: '🤖', est: '2 weeks',
        description: 'Decision trees, SVMs, random forests, gradient boosting, k-means, DBSCAN, and ensemble methods.',
        project: 'Build a credit risk scoring system using XGBoost. Implement proper cross-validation, feature engineering, and model interpretability with SHAP.',
        resources: ['scikit-learn Docs', 'Hands-On ML (Géron)', 'StatQuest ML Playlist'] },
      { name: 'Neural Networks', level: 'intermediate', icon: '🧠', est: '2 weeks',
        description: 'Backpropagation, activation functions, optimizers (SGD, Adam), regularization, batch normalization, and architecture design.',
        project: 'Implement a neural network framework from scratch (forward pass, backprop, gradient descent). Train it on CIFAR-10 and achieve >70% accuracy.',
        resources: ['Neural Networks and Deep Learning (Nielsen)', 'CS231n Stanford', 'FastAI Course'] },
      { name: 'Deep Learning Frameworks', level: 'intermediate', icon: '🔥', est: '1 week',
        description: 'PyTorch: tensors, autograd, custom datasets, data loaders, training loops, and model serialization.',
        project: 'Build a style transfer application using PyTorch. Implement both neural style transfer and fast style transfer approaches.',
        resources: ['PyTorch Tutorials', 'Deep Learning with PyTorch (Stevens)', 'd2l.ai'] },
      { name: 'NLP & Transformers', level: 'advanced', icon: '📝', est: '2 weeks',
        description: 'Attention mechanisms, transformer architecture, BERT, GPT, tokenization, fine-tuning, and prompt engineering.',
        project: 'Fine-tune a DistilBERT model for sentiment analysis on movie reviews. Deploy it as a REST API with FastAPI.',
        resources: ['Hugging Face Course', 'Attention Is All You Need (Paper)', 'CS224N Stanford'] },
      { name: 'MLOps & Deployment', level: 'advanced', icon: '🚢', est: '1 week',
        description: 'Model versioning, experiment tracking, containerization, model serving, A/B testing, and monitoring in production.',
        project: 'Set up an end-to-end ML pipeline: DVC for data versioning, MLflow for experiments, Docker for packaging, and FastAPI for serving.',
        resources: ['MLOps.community', 'Made With ML', 'Full Stack Deep Learning'] },
    ]
  },
  'systems': {
    category: 'Systems Programming',
    color: '#f59e0b',
    skills: [
      { name: 'C Fundamentals', level: 'beginner', icon: '🔧', est: '1 week',
        description: 'Pointers, memory management, structs, file I/O, and understanding the compilation process.',
        project: 'Build a memory allocator (malloc/free/realloc) from scratch using sbrk. Pass a suite of stress tests.',
        resources: ['C Programming Language (K&R)', 'CS:APP (Bryant & O\'Hallaron)', 'Beej\'s C Guide'] },
      { name: 'Data Structures', level: 'beginner', icon: '🏛️', est: '2 weeks',
        description: 'Linked lists, trees, hash tables, heaps, graphs, and their time/space complexity tradeoffs.',
        project: 'Implement a high-performance hash table with open addressing, Robin Hood hashing, and automatic resizing. Benchmark against std::unordered_map.',
        resources: ['CLRS Introduction to Algorithms', 'Algorithms (Sedgewick)', 'visualgo.net'] },
      { name: 'Operating Systems', level: 'intermediate', icon: '💻', est: '2 weeks',
        description: 'Processes, threads, scheduling, virtual memory, file systems, and synchronization primitives.',
        project: 'Build a mini OS kernel that supports process scheduling (round-robin + priority), virtual memory with paging, and a simple file system.',
        resources: ['OSTEP (Operating Systems: Three Easy Pieces)', 'xv6 MIT Course', 'Linux Kernel Development'] },
      { name: 'Networking', level: 'intermediate', icon: '🌐', est: '1 week',
        description: 'TCP/IP stack, socket programming, HTTP protocol, DNS resolution, and network security basics.',
        project: 'Build an HTTP/1.1 server from scratch in C that supports GET, POST, chunked transfer encoding, and keep-alive connections.',
        resources: ['Beej\'s Network Guide', 'Computer Networking (Kurose)', 'TCP/IP Illustrated'] },
      { name: 'Concurrency', level: 'advanced', icon: '⚙️', est: '1 week',
        description: 'Mutexes, semaphores, condition variables, lock-free data structures, and the happens-before relationship.',
        project: 'Build a thread pool with work-stealing, a concurrent hash map, and a lock-free queue. Prove correctness under stress testing.',
        resources: ['The Art of Multiprocessor Programming', 'C++ Concurrency in Action', 'Is Parallel Programming Hard?'] },
      { name: 'Compilers', level: 'advanced', icon: '🔨', est: '2 weeks',
        description: 'Lexing, parsing, AST construction, type checking, IR generation, and basic optimization passes.',
        project: 'Build a compiler for a subset of C (variables, functions, if/else, while, arrays) that targets x86-64 assembly.',
        resources: ['Crafting Interpreters (Nystrom)', 'Engineering a Compiler', 'Dragon Book'] },
      { name: 'Distributed Systems', level: 'expert', icon: '🌍', est: '2 weeks',
        description: 'Consensus (Raft/Paxos), replication, consistent hashing, vector clocks, and CAP theorem implications.',
        project: 'Implement the Raft consensus algorithm. Build a distributed key-value store on top of it with linearizable reads.',
        resources: ['Designing Data-Intensive Applications', 'MIT 6.824 Labs', 'Raft Paper'] },
      { name: 'Performance Engineering', level: 'expert', icon: '📈', est: '1 week',
        description: 'CPU caches, branch prediction, SIMD, profiling tools (perf, VTune), and algorithmic optimization.',
        project: 'Optimize a matrix multiplication to achieve >80% of theoretical peak FLOPS using cache blocking, SIMD intrinsics, and loop unrolling.',
        resources: ['Performance Engineering of Software Systems (MIT)', 'What Every Programmer Should Know About Memory', 'Agner Fog Guides'] },
    ]
  },
  'mobile': {
    category: 'Mobile Development',
    color: '#10b981',
    skills: [
      { name: 'Dart Language', level: 'beginner', icon: '🎯', est: '3 days',
        description: 'Dart syntax, null safety, async programming, collections, and sound type system.',
        project: 'Build a CLI task manager in Dart with persistent storage, categories, priorities, and search functionality.',
        resources: ['Dart.dev Tour', 'Effective Dart', 'Dart Language Specification'] },
      { name: 'Flutter Fundamentals', level: 'beginner', icon: '💙', est: '1 week',
        description: 'Widget tree, StatelessWidget vs StatefulWidget, layout system, navigation, and the rendering pipeline.',
        project: 'Build a weather app with animated backgrounds that change based on conditions. Include location search and 5-day forecasts.',
        resources: ['Flutter.dev Codelabs', 'Flutter in Action', 'The Boring Flutter Show'] },
      { name: 'State Management', level: 'intermediate', icon: '🔄', est: '5 days',
        description: 'Provider, Riverpod, BLoC pattern, and reactive state management with streams.',
        project: 'Build an expense tracker with BLoC pattern: categories, charts, monthly summaries, and CSV export.',
        resources: ['Riverpod Documentation', 'BLoC Library Docs', 'Flutter State Management Guide'] },
      { name: 'Platform Channels', level: 'advanced', icon: '🔗', est: '4 days',
        description: 'Method channels, event channels, and platform-specific code for iOS (Swift) and Android (Kotlin).',
        project: 'Build a Flutter plugin that accesses the device\'s health/fitness APIs on both iOS and Android.',
        resources: ['Flutter Platform Channels', 'Writing Custom Platform Plugins', 'Pigeon Package'] },
      { name: 'Animations', level: 'intermediate', icon: '🎬', est: '4 days',
        description: 'Implicit & explicit animations, custom painters, Hero transitions, and Rive/Lottie integration.',
        project: 'Create a meditation app with fluid particle animations, breathing guides with custom painters, and smooth page transitions.',
        resources: ['Flutter Animation Guide', 'Rive App', 'Animation Deep Dive'] },
      { name: 'Backend Integration', level: 'intermediate', icon: '☁️', est: '5 days',
        description: 'Firebase, Supabase, REST APIs, GraphQL, offline-first with Hive/Isar, and real-time data sync.',
        project: 'Build a real-time chat app with Firebase: authentication, Firestore messages, push notifications, and image sharing.',
        resources: ['FlutterFire Docs', 'Supabase Flutter', 'Isar Database'] },
    ]
  }
};

// Generic fallback skills for any goal
const GENERIC_SKILLS = [
  { name: 'Problem Decomposition', level: 'beginner', icon: '🧩', est: '2 days',
    description: 'Break complex problems into manageable sub-problems. Master divide-and-conquer thinking.',
    project: 'Take a complex open-source project and create a complete architecture diagram. Document every module and its responsibilities.',
    resources: ['How to Solve It (Polya)', 'Thinking in Systems', 'A Philosophy of Software Design'] },
  { name: 'Version Control (Git)', level: 'beginner', icon: '📂', est: '2 days',
    description: 'Branching strategies, rebasing, cherry-picking, conflict resolution, and collaborative workflows.',
    project: 'Contribute to an open-source project: fork, branch, commit with conventional commits, handle merge conflicts, and submit a PR.',
    resources: ['Pro Git Book', 'Git Immersion', 'Conventional Commits'] },
  { name: 'Algorithm Design', level: 'intermediate', icon: '🧮', est: '2 weeks',
    description: 'Dynamic programming, graph algorithms, greedy methods, divide-and-conquer, and complexity analysis.',
    project: 'Solve 50 LeetCode problems across all patterns. Document your approach, time complexity, and key insights for each.',
    resources: ['CLRS', 'Algorithm Design Manual (Skiena)', 'Competitive Programmer\'s Handbook'] },
  { name: 'System Design', level: 'advanced', icon: '🏗️', est: '1 week',
    description: 'Scalability patterns, load balancing, caching, message queues, database sharding, and microservices.',
    project: 'Design Twitter from scratch: data model, API design, news feed algorithm, real-time notifications, and capacity estimation.',
    resources: ['System Design Interview (Alex Xu)', 'Designing Data-Intensive Applications', 'High Scalability Blog'] },
  { name: 'DevOps & Cloud', level: 'advanced', icon: '☁️', est: '1 week',
    description: 'Docker, Kubernetes, CI/CD pipelines, infrastructure as code (Terraform), and cloud services (AWS/GCP).',
    project: 'Containerize a full-stack app, set up K8s deployment with auto-scaling, and create a CI/CD pipeline with GitHub Actions.',
    resources: ['Docker Docs', 'Kubernetes in Action', 'AWS Well-Architected Framework'] },
  { name: 'Technical Writing', level: 'beginner', icon: '📝', est: '3 days',
    description: 'Documentation, README files, API docs, architecture decision records, and technical blog posts.',
    project: 'Write comprehensive documentation for one of your projects: README, API reference, contributing guide, and architecture overview.',
    resources: ['Google Technical Writing Course', 'Docs for Developers', 'Write the Docs'] },
];

/**
 * Detects the category of a goal based on keywords
 */
function detectCategory(goal) {
  const lower = goal.toLowerCase();
  
  const patterns = [
    { keys: ['web', 'react', 'frontend', 'front-end', 'website', 'html', 'css', 'javascript', 'next.js', 'vue', 'angular', 'ui', 'ux', 'full-stack', 'fullstack', 'full stack', 'node.js', 'express'], cat: 'web' },
    { keys: ['ml', 'machine learning', 'deep learning', 'neural', 'ai', 'artificial intelligence', 'nlp', 'computer vision', 'data science', 'tensorflow', 'pytorch', 'model', 'training', 'classification', 'regression', 'transformer', 'llm', 'gpt'], cat: 'ml' },
    { keys: ['systems', 'operating system', 'kernel', 'compiler', 'distributed', 'networking', 'tcp', 'concurrency', 'c programming', 'c++', 'rust', 'low-level', 'embedded', 'memory', 'assembly', 'performance'], cat: 'systems' },
    { keys: ['mobile', 'flutter', 'react native', 'ios', 'android', 'swift', 'kotlin', 'app development', 'mobile app', 'cross-platform'], cat: 'mobile' },
  ];

  for (const { keys, cat } of patterns) {
    if (keys.some(k => lower.includes(k))) return cat;
  }

  return null;
}

/**
 * Generates a skill graph for a given goal
 */
export function generateSkillGraph(goal) {
  const category = detectCategory(goal);
  
  let skills;
  let graphColor;
  let categoryName;
  
  if (category && SKILL_TEMPLATES[category]) {
    const template = SKILL_TEMPLATES[category];
    skills = [...template.skills];
    graphColor = template.color;
    categoryName = template.category;
    
    // Add 2-3 generic skills for variety
    const shuffled = [...GENERIC_SKILLS].sort(() => Math.random() - 0.5);
    skills.push(...shuffled.slice(0, 3));
  } else {
    // Unknown category — use generic + mix from all
    categoryName = 'Engineering Mastery';
    graphColor = '#00f0ff';
    skills = [...GENERIC_SKILLS];
    
    // Pull 2 random skills from each template
    Object.values(SKILL_TEMPLATES).forEach(template => {
      const shuffled = [...template.skills].sort(() => Math.random() - 0.5);
      skills.push(...shuffled.slice(0, 2));
    });
  }

  // Build nodes with IDs and positions
  const nodes = skills.map((skill, i) => ({
    id: `node-${i}`,
    ...skill,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    completed: false,
  }));

  // Generate edges — connect skills in a meaningful graph
  const edges = [];
  const levelOrder = { beginner: 0, intermediate: 1, advanced: 2, expert: 3 };
  
  // Sort by level for ordered connections
  const sortedIndices = nodes
    .map((n, i) => ({ index: i, level: levelOrder[n.level] || 0 }))
    .sort((a, b) => a.level - b.level);

  // Connect sequential skills within similar levels
  for (let i = 0; i < sortedIndices.length - 1; i++) {
    edges.push({
      source: nodes[sortedIndices[i].index].id,
      target: nodes[sortedIndices[i + 1].index].id,
    });
  }

  // Add cross-connections for a web-like feel
  for (let i = 0; i < nodes.length; i++) {
    const connections = Math.floor(Math.random() * 2) + 1;
    for (let c = 0; c < connections; c++) {
      const target = Math.floor(Math.random() * nodes.length);
      if (target !== i) {
        const edgeKey = [nodes[i].id, nodes[target].id].sort().join('-');
        if (!edges.some(e => [e.source, e.target].sort().join('-') === edgeKey)) {
          edges.push({ source: nodes[i].id, target: nodes[target].id });
        }
      }
    }
  }

  return { nodes, edges, category: categoryName, color: graphColor, goal };
}
