// 全局变量
let currentTheorem = 1;
let currentRadius = 100;
let animationId;
let quizQuestions = [
    {
        question: "在圆中，如果一条弦被直径垂直平分，那么这条弦所对的两个圆周角有什么关系？",
        options: ["A. 相等", "B. 互补", "C. 和为180°", "D. 没有关系"],
        answer: "A",
        explanation: "正确！根据圆的弦的性质，被直径垂直平分的弦所对的两个圆周角相等。",
        relatedTheorem: 3
    },
    {
        question: "圆的切线定理指出切线与半径的关系是什么？",
        options: ["A. 平行", "B. 垂直", "C. 相交成45°角", "D. 没有固定关系"],
        answer: "B",
        explanation: "正确！圆的切线与过切点的半径垂直。",
        relatedTheorem: 2
    },
    {
        question: "圆心角与其所对弧的圆周角的关系是什么？",
        options: ["A. 相等", "B. 圆周角是圆心角的一半", "C. 圆心角是圆周角的一半", "D. 互为补角"],
        answer: "B",
        explanation: "正确！圆心角等于其所对弧的圆周角的两倍，或者说圆周角是圆心角的一半。",
        relatedTheorem: 1
    }
];
let currentQuestionIndex = 0;
let correctAnswers = 0;
let quizStats = {
    totalQuestions: quizQuestions.length,
    correctAnswers: 0,
    currentProgress: 0
};

// DEEP 模式控制
function setupDeepMode() {
    const btn = document.getElementById('deep-mode-toggle');
    if (btn) {
        btn.addEventListener('click', toggleDeepMode);
    }
}

function toggleDeepMode() {
    document.body.classList.toggle('deep-mode');
    const enabled = document.body.classList.contains('deep-mode');
    try {
        localStorage.setItem('deepMode', enabled);
    } catch (e) {
        console.warn('无法存储 DEEP 模式状态：', e);
    }
}

function checkStoredDeepMode() {
    try {
        const stored = localStorage.getItem('deepMode');
        if (stored === 'true') {
            document.body.classList.add('deep-mode');
        }
    } catch (e) {
        console.warn('读取 DEEP 模式状态失败：', e);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeHeroAnimation();
        initializeInteractiveCanvas();
        initializeDemoAnimation();
        setupNavigation();
        setupMobileMenu();
        initializeQuizStats();
        setupContactForm();
        initializeBreadcrumb();
        setupAccessibilityTools();
        setupThemeControls();
        setupDeepMode();              // DEEP 模式支持
        checkStoredDeepMode();        // 读取本地存储设置
        setupPrivacyConsent();
        setupLearningAnalytics();
        
        // 添加键盘导航支持
        document.addEventListener('keydown', handleKeyboardNavigation);
        
        // 初始化半径显示
        updateRadiusDisplay();
        
        // 初始化当前定理名称显示
        updateCurrentTheoremName();
        
        // 显示AI欢迎消息
        setTimeout(showAIWelcome, 1000);
        
        // 监听滚动事件更新导航状态
        window.addEventListener('scroll', updateNavigationState);
        
        // 初始更新导航状态
        updateNavigationState();
        
        // 检查用户的无障碍偏好
        checkUserPreferences();
        
        // 检查系统主题偏好
        checkSystemThemePreference();
        
        // 全局错误处理
        setupGlobalErrorHandling();
        
    } catch (error) {
        showError('初始化过程中出现错误：' + error.message);
        console.error('初始化错误:', error);
    }
});

// 初始化英雄区域动画
function initializeHeroAnimation() {
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    
    // 设置Canvas尺寸
    canvas.width = 400;
    canvas.height = 400;
    
    let angle = 0;
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 120;
        
        // 绘制主圆
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // 绘制旋转的点
        const pointX = centerX + radius * Math.cos(angle);
        const pointY = centerY + radius * Math.sin(angle);
        
        ctx.beginPath();
        ctx.arc(pointX, pointY, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#f72585';
        ctx.fill();
        
        // 绘制半径
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(pointX, pointY);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // 绘制切线
        const tangentLength = 80;
        const tangentAngle = angle + Math.PI / 2;
        const tangentX1 = pointX + tangentLength * Math.cos(tangentAngle);
        const tangentY1 = pointY + tangentLength * Math.sin(tangentAngle);
        const tangentX2 = pointX - tangentLength * Math.cos(tangentAngle);
        const tangentY2 = pointY - tangentLength * Math.sin(tangentAngle);
        
        ctx.beginPath();
        ctx.moveTo(tangentX1, tangentY1);
        ctx.lineTo(tangentX2, tangentY2);
        ctx.strokeStyle = 'rgba(76, 201, 240, 0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // 更新角度
        angle += 0.02;
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
}

// 初始化交互式画布
function initializeInteractiveCanvas() {
    const canvas = document.getElementById('interactive-canvas');
    const ctx = canvas.getContext('2d');
    
    // 设置Canvas尺寸
    canvas.width = 600;
    canvas.height = 400;
    
    drawTheorem();
}

// 初始化演示动画
function initializeDemoAnimation() {
    const canvas = document.getElementById('demo-canvas');
    const ctx = canvas.getContext('2d');
    
    // 设置Canvas尺寸
    canvas.width = 600;
    canvas.height = 300;
    
    let demoAnimationId;
    let demoAngle = 0;
    let isDemoPlaying = false;
    
    function animateDemo() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 80;
        
        // 绘制主圆
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // 绘制旋转的点
        const pointX = centerX + radius * Math.cos(demoAngle);
        const pointY = centerY + radius * Math.sin(demoAngle);
        
        ctx.beginPath();
        ctx.arc(pointX, pointY, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#f72585';
        ctx.fill();
        
        // 绘制半径
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(pointX, pointY);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // 绘制切线
        const tangentLength = 60;
        const tangentAngle = demoAngle + Math.PI / 2;
        
        ctx.beginPath();
        ctx.moveTo(pointX + tangentLength * Math.cos(tangentAngle), 
                   pointY + tangentLength * Math.sin(tangentAngle));
        ctx.lineTo(pointX - tangentLength * Math.cos(tangentAngle), 
                   pointY - tangentLength * Math.sin(tangentAngle));
        ctx.strokeStyle = 'rgba(76, 201, 240, 0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // 更新角度
        if (isDemoPlaying) {
            demoAngle += 0.02;
        }
        
        demoAnimationId = requestAnimationFrame(animateDemo);
    }
    
    animateDemo();
    
    // 全局函数供按钮调用
    window.toggleDemo = function() {
        isDemoPlaying = !isDemoPlaying;
        const playBtn = document.querySelector('.play-btn');
        playBtn.textContent = isDemoPlaying ? '⏸ 暂停演示' : '▶ 播放演示';
    };
    
    window.watchDemo = function() {
        isDemoPlaying = true;
        const playBtn = document.querySelector('.play-btn');
        playBtn.textContent = '⏸ 暂停演示';
    };
}

// 绘制当前定理
function drawTheorem() {
    const canvas = document.getElementById('interactive-canvas');
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = currentRadius;
    
    // 绘制坐标网格（背景）
    drawGrid(ctx, canvas.width, canvas.height);
    
    // 根据当前定理绘制不同的图形
    switch(currentTheorem) {
        case 1: // 圆心角定理
            drawCentralAngleTheorem(ctx, centerX, centerY, radius);
            break;
        case 2: // 切线定理
            drawTangentTheorem(ctx, centerX, centerY, radius);
            break;
        case 3: // 弦的性质
            drawChordProperties(ctx, centerX, centerY, radius);
            break;
        case 4: // 圆周角定理
            drawInscribedAngleTheorem(ctx, centerX, centerY, radius);
            break;
    }
}

// 绘制坐标网格
function drawGrid(ctx, width, height) {
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 1;
    
    // 绘制水平线
    for (let y = 0; y <= height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
    
    // 绘制垂直线
    for (let x = 0; x <= width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
}

// 绘制圆心角定理
function drawCentralAngleTheorem(ctx, centerX, centerY, radius) {
    // 绘制圆
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#4361ee';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // 绘制圆心角
    const angle1 = Math.PI / 6;
    const angle2 = Math.PI / 2;
    
    const point1X = centerX + radius * Math.cos(angle1);
    const point1Y = centerY + radius * Math.sin(angle1);
    const point2X = centerX + radius * Math.cos(angle2);
    const point2Y = centerY + radius * Math.sin(angle2);
    
    // 绘制圆心角
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(point1X, point1Y);
    ctx.lineTo(point2X, point2Y);
    ctx.closePath();
    ctx.strokeStyle = '#f72585';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 标注角度
    const centralAngle = angle2 - angle1;
    drawAngleArc(ctx, centerX, centerY, 30, angle1, angle2, '#f72585');
    ctx.fillStyle = '#f72585';
    ctx.font = '14px Arial';
    ctx.fillText(`圆心角: ${(centralAngle * 180 / Math.PI).toFixed(1)}°`, centerX + 40, centerY - 20);
    
    // 绘制圆周角
    const inscribedAngle = centralAngle / 2;
    const point3X = centerX + radius * Math.cos(angle1 + inscribedAngle);
    const point3Y = centerY + radius * Math.sin(angle1 + inscribedAngle);
    
    ctx.beginPath();
    ctx.moveTo(point1X, point1Y);
    ctx.lineTo(point3X, point3Y);
    ctx.lineTo(point2X, point2Y);
    ctx.strokeStyle = '#4cc9f0';
    ctx.stroke();
    
    drawAngleArc(ctx, point3X, point3Y, 20, 
        Math.atan2(point1Y - point3Y, point1X - point3X),
        Math.atan2(point2Y - point3Y, point2X - point3X), '#4cc9f0');
    
    ctx.fillStyle = '#4cc9f0';
    ctx.fillText(`圆周角: ${(inscribedAngle * 180 / Math.PI).toFixed(1)}°`, point3X + 20, point3Y - 10);
}

// 绘制切线定理
function drawTangentTheorem(ctx, centerX, centerY, radius) {
    // 绘制圆
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#4361ee';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // 绘制切点
    const tangentAngle = Math.PI / 4;
    const tangentPointX = centerX + radius * Math.cos(tangentAngle);
    const tangentPointY = centerY + radius * Math.sin(tangentAngle);
    
    // 绘制半径到切点
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(tangentPointX, tangentPointY);
    ctx.strokeStyle = '#f72585';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 绘制切线
    const tangentLength = 150;
    const perpendicularAngle = tangentAngle + Math.PI / 2;
    
    ctx.beginPath();
    ctx.moveTo(tangentPointX + tangentLength * Math.cos(perpendicularAngle), 
               tangentPointY + tangentLength * Math.sin(perpendicularAngle));
    ctx.lineTo(tangentPointX - tangentLength * Math.cos(perpendicularAngle), 
               tangentPointY - tangentLength * Math.sin(perpendicularAngle));
    ctx.strokeStyle = '#4cc9f0';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 标注直角
    drawRightAngle(ctx, tangentPointX, tangentPointY, tangentAngle);
    
    // 添加标注
    ctx.fillStyle = '#f72585';
    ctx.font = '14px Arial';
    ctx.fillText('半径', centerX + radius/2 * Math.cos(tangentAngle) - 10, 
                 centerY + radius/2 * Math.sin(tangentAngle) - 10);
    
    ctx.fillStyle = '#4cc9f0';
    ctx.fillText('切线', tangentPointX + 60, tangentPointY - 20);
}

// 绘制弦的性质
function drawChordProperties(ctx, centerX, centerY, radius) {
    // 绘制圆
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#4361ee';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // 绘制弦
    const chordAngle1 = Math.PI / 6;
    const chordAngle2 = 5 * Math.PI / 6;
    
    const chordPoint1X = centerX + radius * Math.cos(chordAngle1);
    const chordPoint1Y = centerY + radius * Math.sin(chordAngle1);
    const chordPoint2X = centerX + radius * Math.cos(chordAngle2);
    const chordPoint2Y = centerY + radius * Math.sin(chordAngle2);
    
    ctx.beginPath();
    ctx.moveTo(chordPoint1X, chordPoint1Y);
    ctx.lineTo(chordPoint2X, chordPoint2Y);
    ctx.strokeStyle = '#f72585';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 绘制垂直平分直径
    const midPointX = (chordPoint1X + chordPoint2X) / 2;
    const midPointY = (chordPoint1Y + chordPoint2Y) / 2;
    
    const perpendicularAngle = Math.atan2(chordPoint2Y - chordPoint1Y, chordPoint2X - chordPoint1X) + Math.PI / 2;
    
    ctx.beginPath();
    ctx.moveTo(centerX + radius * Math.cos(perpendicularAngle), 
               centerY + radius * Math.sin(perpendicularAngle));
    ctx.lineTo(centerX - radius * Math.cos(perpendicularAngle), 
               centerY - radius * Math.sin(perpendicularAngle));
    ctx.strokeStyle = '#4cc9f0';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 标注中点
    ctx.beginPath();
    ctx.arc(midPointX, midPointY, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#f8961e';
    ctx.fill();
    
    ctx.fillStyle = '#f8961e';
    ctx.font = '14px Arial';
    ctx.fillText('中点', midPointX + 10, midPointY - 10);
}

// 绘制圆周角定理
function drawInscribedAngleTheorem(ctx, centerX, centerY, radius) {
    // 绘制圆
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#4361ee';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // 绘制弧和对应的角
    const angle1 = Math.PI / 4;
    const angle2 = 3 * Math.PI / 4;
    const inscribedAnglePos = Math.PI / 3;
    
    const point1X = centerX + radius * Math.cos(angle1);
    const point1Y = centerY + radius * Math.sin(angle1);
    const point2X = centerX + radius * Math.cos(angle2);
    const point2Y = centerY + radius * Math.sin(angle2);
    const point3X = centerX + radius * Math.cos(inscribedAnglePos);
    const point3Y = centerY + radius * Math.sin(inscribedAnglePos);
    
    // 绘制圆周角
    ctx.beginPath();
    ctx.moveTo(point1X, point1Y);
    ctx.lineTo(point3X, point3Y);
    ctx.lineTo(point2X, point2Y);
    ctx.strokeStyle = '#f72585';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 绘制圆心角
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(point1X, point1Y);
    ctx.lineTo(point2X, point2Y);
    ctx.strokeStyle = '#4cc9f0';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 标注角度
    const centralAngle = angle2 - angle1;
    const inscribedAngle = centralAngle / 2;
    
    drawAngleArc(ctx, centerX, centerY, 40, angle1, angle2, '#4cc9f0');
    drawAngleArc(ctx, point3X, point3Y, 25, 
        Math.atan2(point1Y - point3Y, point1X - point3X),
        Math.atan2(point2Y - point3Y, point2X - point3X), '#f72585');
    
    ctx.fillStyle = '#4cc9f0';
    ctx.font = '14px Arial';
    ctx.fillText(`圆心角: ${(centralAngle * 180 / Math.PI).toFixed(1)}°`, centerX + 50, centerY - 30);
    
    ctx.fillStyle = '#f72585';
    ctx.fillText(`圆周角: ${(inscribedAngle * 180 / Math.PI).toFixed(1)}°`, point3X + 30, point3Y - 15);
}

// 绘制角度弧
function drawAngleArc(ctx, x, y, radius, startAngle, endAngle, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
}

// 绘制直角符号
function drawRightAngle(ctx, x, y, angle) {
    const size = 15;
    const offsetX = size * Math.cos(angle);
    const offsetY = size * Math.sin(angle);
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + offsetX, y + offsetY);
    ctx.lineTo(x + offsetX - offsetY, y + offsetY + offsetX);
    ctx.strokeStyle = '#f8961e';
    ctx.lineWidth = 2;
    ctx.stroke();
}

// 定理选择变化
function changeTheorem() {
    currentTheorem = parseInt(document.getElementById('theorem-select').value);
    drawTheorem();
    updateCurrentTheoremName();
    playSound('click');
}

// 显示当前定理信息
function showCurrentTheoremInfo() {
    showTheoremDetail(currentTheorem);
}

// 初始化测验统计
function initializeQuizStats() {
    updateQuizStats();
    updateProgressBar();
}

// 更新测验统计
function updateQuizStats() {
    document.getElementById('total-questions').textContent = quizStats.totalQuestions;
    document.getElementById('correct-answers').textContent = quizStats.correctAnswers;
    
    const percentage = quizStats.totalQuestions > 0 ? 
        Math.round((quizStats.correctAnswers / quizStats.totalQuestions) * 100) : 0;
    document.getElementById('score-percentage').textContent = percentage + '%';
}

// 更新进度条
function updateProgressBar() {
    const progress = (currentQuestionIndex / quizQuestions.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    document.getElementById('progress-percent').textContent = Math.round(progress) + '%';
}

// 更新半径
function updateRadius() {
    currentRadius = parseInt(document.getElementById('radius-slider').value);
    drawTheorem();
    updateRadiusDisplay();
}

// 更新半径显示
function updateRadiusDisplay() {
    const radiusValue = document.getElementById('radius-value');
    if (radiusValue) {
        radiusValue.textContent = currentRadius + 'px';
    }
}

// 更新当前定理名称显示
function updateCurrentTheoremName() {
    const theoremNames = {
        1: '圆心角定理',
        2: '切线定理',
        3: '弦的性质',
        4: '圆周角定理'
    };
    
    const theoremNameElement = document.getElementById('current-theorem-name');
    if (theoremNameElement) {
        theoremNameElement.textContent = theoremNames[currentTheorem];
    }
}

// 重置模拟
function resetSimulation() {
    currentRadius = 100;
    document.getElementById('radius-slider').value = currentRadius;
    drawTheorem();
    playSound('reset');
}

// 显示定理详情
function showTheoremDetail(theoremId) {
    const modal = document.getElementById('theorem-modal');
    const modalContent = document.getElementById('modal-content');
    
    const theoremDetails = {
        1: {
            title: "圆心角定理",
            description: "圆心角等于其所对弧的圆周角的两倍。这是圆的基本性质之一，在解决与圆相关的几何问题时非常有用。",
            formula: "∠AOB = 2 × ∠ACB",
            example: "如果圆心角是60°，那么对应的圆周角就是30°。"
        },
        2: {
            title: "切线定理", 
            description: "切线与过切点的半径垂直。这是判断直线是否为圆的切线的重要依据。",
            formula: "切线 ⊥ 半径",
            example: "从圆外一点向圆引切线，切线与连接该点和圆心的线段垂直。"
        },
        3: {
            title: "弦的性质",
            description: "垂直于弦的直径平分该弦，并且平分弦所对的两条弧。这个性质在证明弦相等或弧相等时经常使用。",
            formula: "直径 ⊥ 弦 ⇒ 平分弦和弧",
            example: "如果直径垂直于弦，那么弦被分成两个相等的部分。"
        },
        4: {
            title: "圆周角定理",
            description: "同弧或等弧所对的圆周角相等，且等于圆心角的一半。这个定理是证明角相等的重要工具。",
            formula: "∠ACB = ½ × ∠AOB",
            example: "在同一个圆中，对着相同弧的圆周角都相等。"
        }
    };
    
    const theorem = theoremDetails[theoremId];
    modalContent.innerHTML = `
        <h3>${theorem.title}</h3>
        <p>${theorem.description}</p>
        <div class="theorem-formula">
            <strong>公式:</strong> ${theorem.formula}
        </div>
        <div class="theorem-example">
            <strong>示例:</strong> ${theorem.example}
        </div>
    `;
    
    modal.style.display = 'block';
    playSound('modal');
}

// 关闭模态框
function closeModal() {
    document.getElementById('theorem-modal').style.display = 'none';
    playSound('close');
}

// 检查测验答案
function checkAnswer() {
    try {
        const selectedOption = document.querySelector('input[name="quiz"]:checked');
        const resultDiv = document.getElementById('result-content');
        const quizQuestion = document.getElementById('quiz-question');
        const quizResult = document.getElementById('quiz-result');
        
        if (!selectedOption) {
            showWarning('请选择一个答案！');
            return;
        }
        
        const userAnswer = selectedOption.value;
        const currentQuestion = quizQuestions[currentQuestionIndex];
        
        if (userAnswer === currentQuestion.answer) {
            quizStats.correctAnswers++;
            resultDiv.innerHTML = `
                <div style="color: #4cc9f0; font-size: 1.2rem; margin-bottom: 1rem;">
                    ✅ 回答正确！
                </div>
                <p>${currentQuestion.explanation}</p>
                <div style="margin-top: 1rem; padding: 1rem; background: #f0f8ff; border-radius: 5px;">
                    <strong>🎉 恭喜！你已经答对了 ${quizStats.correctAnswers} 道题</strong>
                </div>
            `;
            playSound('success');
            showSuccess('回答正确！');
        } else {
            resultDiv.innerHTML = `
                <div style="color: #f72585; font-size: 1.2rem; margin-bottom: 1rem;">
                    ❌ 回答错误
                </div>
                <p>正确答案是: ${currentQuestion.answer}</p>
                <p>${currentQuestion.explanation}</p>
                <div style="margin-top: 1rem; padding: 1rem; background: #fff0f0; border-radius: 5px;">
                    <strong>💡 建议复习相关定理以加深理解</strong>
                </div>
            `;
            playSound('error');
            showWarning('回答错误，请查看解析');
        }
        
        quizQuestion.style.display = 'none';
        quizResult.style.display = 'block';
        
        // 更新统计信息
        updateQuizStats();
        
    } catch (error) {
        showError('检查答案过程中出现错误：' + error.message);
        console.error('检查答案错误:', error);
    }
}

// 下一题
function nextQuestion() {
    currentQuestionIndex = (currentQuestionIndex + 1) % quizQuestions.length;
    loadQuestion();
    
    document.getElementById('quiz-question').style.display = 'block';
    document.getElementById('quiz-result').style.display = 'none';
    
    // 清除选择
    const options = document.querySelectorAll('input[name="quiz"]');
    options.forEach(option => option.checked = false);
    
    // 更新进度条
    updateProgressBar();
}

// 复习相关定理
function reviewAnswer() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (currentQuestion.relatedTheorem) {
        showTheoremDetail(currentQuestion.relatedTheorem);
        // 滚动到交互区域查看相关定理
        scrollToSection('interactive');
        // 设置交互区域显示相关定理
        setTimeout(() => {
            document.getElementById('theorem-select').value = currentQuestion.relatedTheorem;
            changeTheorem();
        }, 500);
    }
}

// AI聊天机器人功能
function showAIWelcome() {
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages) {
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'message ai-message';
        welcomeMessage.innerHTML = '<p>欢迎来到圆几何探索！我可以帮助你解答关于圆的几何问题，比如圆心角定理、切线性质等。有什么问题尽管问我！</p>';
        chatMessages.appendChild(welcomeMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

function handleChatInput(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (message === '') return;
    
    const chatMessages = document.getElementById('chat-messages');
    
    // 添加用户消息
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.style.marginLeft = 'auto';
    userMessage.style.background = '#e3f2fd';
    userMessage.innerHTML = `<p>${message}</p>`;
    chatMessages.appendChild(userMessage);
    
    // 清空输入框
    input.value = '';
    
    // 滚动到底部
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // 模拟AI思考
    setTimeout(() => {
        generateAIResponse(message);
    }, 1000);
}

function generateAIResponse(userMessage) {
    const chatMessages = document.getElementById('chat-messages');
    const aiMessage = document.createElement('div');
    aiMessage.className = 'message ai-message';
    
    // 简单的关键词匹配回复
    let response = '';
    
    if (userMessage.includes('圆心角') || userMessage.includes('圆心角定理')) {
        response = '圆心角定理指出：圆心角等于其所对弧的圆周角的两倍。例如，如果圆心角是60°，那么对应的圆周角就是30°。';
    } else if (userMessage.includes('切线') || userMessage.includes('切线定理')) {
        response = '切线定理说明：圆的切线与过切点的半径垂直。这是判断直线是否为圆的切线的重要依据。';
    } else if (userMessage.includes('弦') || userMessage.includes('弦的性质')) {
        response = '弦的性质：垂直于弦的直径平分该弦，并且平分弦所对的两条弧。这个性质在证明弦相等或弧相等时经常使用。';
    } else if (userMessage.includes('圆周角') || userMessage.includes('圆周角定理')) {
        response = '圆周角定理：同弧或等弧所对的圆周角相等，且等于圆心角的一半。这个定理是证明角相等的重要工具。';
    } else if (userMessage.includes('学习') || userMessage.includes('怎么学')) {
        response = '建议的学习顺序：1. 先理解基本概念 2. 通过交互演示观察定理应用 3. 尝试自己绘制图形验证 4. 完成测验巩固知识。需要我详细解释哪个定理吗？';
    } else {
        response = '这是一个很好的问题！关于圆的几何定理，我可以帮你解释圆心角定理、切线定理、弦的性质和圆周角定理。你想了解哪一个呢？';
    }
    
    aiMessage.innerHTML = `<p>${response}</p>`;
    chatMessages.appendChild(aiMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 联系表单处理
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            try {
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const message = document.getElementById('message').value.trim();
                
                // 表单验证
                if (!name || !email || !message) {
                    showError('请填写所有必填字段！');
                    return;
                }
                
                if (!isValidEmail(email)) {
                    showError('请输入有效的邮箱地址！');
                    return;
                }
                
                // 显示确认对话框
                const confirmed = await showConfirmation(
                    '确定要发送这条消息吗？',
                    '发送',
                    '取消'
                );
                
                if (!confirmed) {
                    showWarning('消息发送已取消');
                    return;
                }
                
                // 模拟表单提交
                showSuccess(`感谢 ${name} 的留言！我们会尽快通过 ${email} 联系您。`);
                
                // 清空表单
                contactForm.reset();
                
            } catch (error) {
                showError('表单提交过程中出现错误：' + error.message);
                console.error('表单提交错误:', error);
            }
        });
    }
}

// 导航功能
function startLearning() {
    scrollToSection('learning');
}

function watchDemo() {
    const playBtn = document.querySelector('.play-btn');
    playBtn.textContent = '▶ 播放演示';
    scrollToSection('home');
}

// 面包屑导航功能
function initializeBreadcrumb() {
    // 初始设置面包屑为首页
    updateBreadcrumb('首页');
}

function updateBreadcrumb(currentPage) {
    const currentPageElement = document.getElementById('current-page');
    if (currentPageElement) {
        currentPageElement.textContent = currentPage;
    }
}

// 更新导航状态
function updateNavigationState() {
    const sections = ['home', 'learning', 'interactive', 'game', 'quiz'];
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 移除所有活动状态
    navLinks.forEach(link => link.classList.remove('active'));
    
    // 找到当前可见的section
    let currentSection = 'home';
    
    for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
            const rect = section.getBoundingClientRect();
            // 如果section在视口中
            if (rect.top <= 150 && rect.bottom >= 150) {
                currentSection = sectionId;
                break;
            }
        }
    }
    
    // 设置对应的导航链接为活动状态
    const activeLink = document.querySelector(`.nav-link[href="#${currentSection}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // 更新面包屑导航
    updateBreadcrumbBasedOnSection(currentSection);
}

function updateBreadcrumbBasedOnSection(sectionId) {
    const breadcrumbMap = {
        'home': '首页',
        'learning': '学习中心',
        'interactive': '交互学习',
        'game': '互动游戏',
        'quiz': '知识测验'
    };
    
    const pageName = breadcrumbMap[sectionId] || '首页';
    updateBreadcrumb(pageName);
}

// 增强滚动到指定区域功能
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        // 更新面包屑导航
        updateBreadcrumbBasedOnSection(sectionId);
        
        window.scrollTo({
            top: section.offsetTop - 70, // 减去导航栏高度
            behavior: 'smooth'
        });
        playSound('click');
        
        // 延迟更新导航状态，确保滚动完成
        setTimeout(updateNavigationState, 300);
    }
}

// 增强设置导航功能
function setupNavigation() {
    // 平滑滚动
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // 首页logo点击事件
    const logoLink = document.querySelector('.logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('home');
        });
    }
}



// 无障碍工具设置
function setupAccessibilityTools() {
    // 色盲模式
    document.getElementById('colorblind-toggle').addEventListener('click', toggleColorblindMode);
    
    // 黑白模式
    document.getElementById('bw-toggle').addEventListener('click', toggleBWMode);
    
    // 盲人模式
    document.getElementById('blind-toggle').addEventListener('click', toggleBlindMode);
    
    // 工具栏显示/隐藏
    document.getElementById('toggle-toolbar').addEventListener('click', toggleToolbar);
    
    // 键盘快捷键
    document.addEventListener('keydown', handleAccessibilityShortcuts);
}

// 加载并应用用户的无障碍偏好
function checkUserPreferences() {
    try {
        if (localStorage.getItem('colorBlind') === 'true') {
            document.body.classList.add('colorblind-friendly');
        }
        if (localStorage.getItem('bwMode') === 'true') {
            document.body.classList.add('bw-mode');
        }
        if (localStorage.getItem('blindMode') === 'true') {
            document.body.classList.add('blind-mode');
            showAriaDescriptions();
        }
        if (localStorage.getItem('toolbarHidden') === 'true') {
            document.getElementById('accessibility-toolbar').classList.add('hidden');
        }
    } catch (e) {
        console.warn('加载用户偏好失败：', e);
    }
}

// 字体大小调整功能
function increaseFontSize() {
    const body = document.body;
    if (body.classList.contains('font-xlarge')) {
        return; // 已经是最大字体
    } else if (body.classList.contains('font-large')) {
        body.classList.remove('font-large');
        body.classList.add('font-xlarge');
    } else if (body.classList.contains('font-small')) {
        body.classList.remove('font-small');
    } else {
        body.classList.add('font-large');
    }
    saveUserPreference('fontSize', body.className);
    showAccessibilityFeedback('字体大小已增大');
}

function decreaseFontSize() {
    const body = document.body;
    if (body.classList.contains('font-small')) {
        return; // 已经是最小字体
    } else if (body.classList.contains('font-xlarge')) {
        body.classList.remove('font-xlarge');
        body.classList.add('font-large');
    } else if (body.classList.contains('font-large')) {
        body.classList.remove('font-large');
    } else {
        body.classList.add('font-small');
    }
    saveUserPreference('fontSize', body.className);
    showAccessibilityFeedback('字体大小已减小');
}

function resetFontSize() {
    const body = document.body;
    body.classList.remove('font-small', 'font-large', 'font-xlarge');
    saveUserPreference('fontSize', 'default');
    showAccessibilityFeedback('字体大小已重置');
}

// 高对比度模式
function toggleHighContrast() {
    const body = document.body;
    const isHighContrast = body.classList.toggle('high-contrast');
    saveUserPreference('highContrast', isHighContrast);
    showAccessibilityFeedback(isHighContrast ? '高对比度模式已开启' : '高对比度模式已关闭');
}

// 色盲模式切换
function toggleColorblindMode() {
    const body = document.body;
    const enabled = body.classList.toggle('colorblind-friendly');
    saveUserPreference('colorBlind', enabled);
    showAccessibilityFeedback(enabled ? '色盲模式已开启' : '色盲模式已关闭');
}

// 黑白模式切换
function toggleBWMode() {
    const body = document.body;
    const enabled = body.classList.toggle('bw-mode');
    saveUserPreference('bwMode', enabled);
    showAccessibilityFeedback(enabled ? '黑白模式已开启' : '黑白模式已关闭');
}

// 盲人模式切换
function toggleBlindMode() {
    const body = document.body;
    const enabled = body.classList.toggle('blind-mode');
    saveUserPreference('blindMode', enabled);
    showAccessibilityFeedback(enabled ? '盲人模式已开启' : '盲人模式已关闭');
    if (enabled) {
        // 简单朗读页面标题
        const utter = new SpeechSynthesisUtterance('已启用盲人模式，页面内容将以文本形式呈现。');
        speechSynthesis.speak(utter);
        showAriaDescriptions();
    } else {
        hideAriaDescriptions();
    }
}

function showAriaDescriptions() {
    const desc = document.getElementById('aria-descriptions');
    if (!desc) return;
    desc.innerHTML = `
        <p>欢迎使用盲人模式。以下是页面主要部分的概述：</p>
        <ul>
            <li>首页：包括学习引导和动画演示。</li>
            <li>学习区：介绍圆的核心定理，每个定理可深入查看。</li>
            <li>交互区：可调整参数观察几何变化。</li>
            <li>游戏区：Placeholder, 即将开放。</li>
            <li>测验区：通过题目检验知识。</li>
        </ul>
    `;
    desc.style.display = 'block';
}

function hideAriaDescriptions() {
    const desc = document.getElementById('aria-descriptions');
    if (desc) desc.style.display = 'none';
}

// 语言切换功能
function toggleLanguage() {
    const currentLang = document.documentElement.lang;
    const isChinese = currentLang === 'zh-CN';
    
    if (isChinese) {
        switchToEnglish();
    } else {
        switchToChinese();
    }
}

function switchToEnglish() {
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
    updateLanguageContent('en');
    saveUserPreference('language', 'en');
    showAccessibilityFeedback('Switched to English');
}

function switchToChinese() {
    document.documentElement.lang = 'zh-CN';
    document.documentElement.dir = 'ltr';
    updateLanguageContent('zh-CN');
    saveUserPreference('language', 'zh-CN');
    showAccessibilityFeedback('已切换到中文');
}

// 工具栏显示/隐藏
function toggleToolbar() {
    const toolbar = document.getElementById('accessibility-toolbar');
    const isHidden = toolbar.classList.toggle('hidden');
    
    const toggleBtn = document.getElementById('toggle-toolbar');
    const toggleText = toggleBtn.querySelector('.toolbar-text');
}

// 键盘快捷键处理（兼容无障碍工具栏）
function handleAccessibilityShortcuts(e) {
    // Ctrl+Shift+C 色盲模式
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'c') {
        toggleColorblindMode();
        e.preventDefault();
    }
    // Ctrl+Shift+W 黑白模式
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'w') {
        toggleBWMode();
        e.preventDefault();
    }
    // Ctrl+Shift+B 盲人模式
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'b') {
        toggleBlindMode();
        e.preventDefault();
    }
    // Ctrl+T 显示/隐藏工具栏
    if (e.ctrlKey && e.key.toLowerCase() === 't') {
        toggleToolbar();
        e.preventDefault();
    }
}

    
    if (isHidden) {
        toggleText.textContent = '显示';
        showAccessibilityFeedback('工具栏已隐藏');
    } else {
        toggleText.textContent = '隐藏';
        showAccessibilityFeedback('工具栏已显示');
    }
    
    saveUserPreference('toolbarHidden', isHidden);
}

// 加载问题
function loadQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const questionElement = document.getElementById('quiz-question');
    
    questionElement.innerHTML = `
        <h3>问题：${currentQuestion.question}</h3>
        <div class="quiz-options">
            ${currentQuestion.options.map(option => 
                `<label><input type="radio" name="quiz" value="${option.charAt(0)}"> ${option}</label>`
            ).join('')}
        </div>
        <button class="btn-submit" onclick="checkAnswer()">提交答案</button>
    `;
}

// 播放音效
function playSound(type) {
    // 在实际应用中，这里可以添加真实的音效文件
    console.log(`播放音效: ${type}`);
    
    // 简单的音频反馈（使用Web Audio API）
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        let frequency = 440; // 默认频率
        
        switch(type) {
            case 'click':
                frequency = 523.25; // C5
                break;
            case 'success':
                frequency = 659.25; // E5
                break;
            case 'error':
                frequency = 392.00; // G4
                break;
            case 'modal':
                frequency = 587.33; // D5
                break;
            case 'reset':
                frequency = 349.23; // F4
                break;
        }
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
        console.log('音频播放失败:', error);
    }
}

// 设置导航
function setupNavigation() {
    // 平滑滚动
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// 滚动到指定区域
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 70,
            behavior: 'smooth'
        });
        playSound('click');
    }
}

// 设置移动端菜单
function setupMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (toggle && menu) {
        toggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    }
}

// 键盘导航支持
function handleKeyboardNavigation(e) {
    // 支持ESC键关闭模态框
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // 支持数字键快速导航
    if (e.key >= '1' && e.key <= '4') {
        const theoremId = parseInt(e.key);
        showTheoremDetail(theoremId);
    }
}

// 添加触摸设备支持
function setupTouchSupport() {
    // 为触摸设备优化交互
    document.addEventListener('touchstart', function() {}, {passive: true});
}

// 初始化触摸支持
setupTouchSupport();

// 添加窗口调整大小事件
window.addEventListener('resize', function() {
    // 重新绘制Canvas以适应新的尺寸
    drawTheorem();
});