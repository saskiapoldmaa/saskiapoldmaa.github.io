# Interactive Electric Potential Simulator

Explore the electric potential and field lines around two point charges with this interactive simulation. This tool helps visualize how the electric potential and field lines behave in the presence of point charges.

## Interactive Simulation

<div class="simulation-container">
    <iframe src="/simulations/electric-potential/" style="width: 100%; height: 700px; border: 1px solid #ddd; border-radius: 8px;"></iframe>
</div>

## How to Use

1. **Drag the charges** to reposition them in the simulation area
2. Adjust the charge values using the sliders
3. Toggle between showing the potential and field lines using the buttons
4. Enable dark mode for better visibility in low-light conditions

## Physics Behind the Simulation

The simulation calculates the electric potential (V) at each point in space using the principle of superposition:

$$ V = k \left( \frac{q_1}{r_1} + \frac{q_2}{r_2} \right) $$

Where:
- $k$ is Coulomb's constant (set to 1 for simplicity)
- $q_1$ and $q_2$ are the magnitudes of the charges
- $r_1$ and $r_2$ are the distances from the point to each charge

The electric field lines are calculated by tracing the direction of the electric field at each point, which is the negative gradient of the potential:

$$ \vec{E} = -\nabla V $$

## Observations

1. **Positive and Negative Charges**:
   - Like charges repel each other
   - Opposite charges attract each other
   - The potential is positive near positive charges and negative near negative charges

2. **Field Lines**:
   - Field lines originate from positive charges and terminate on negative charges
   - The density of field lines indicates the strength of the electric field
   - Field lines never cross each other

3. **Equipotential Lines**:
   - The color gradient shows lines of equal potential (equipotential lines)
   - Equipotential lines are always perpendicular to electric field lines

## Applications

Understanding electric potential and fields is crucial in many areas of physics and engineering, including:
- Circuit design
- Capacitor behavior
- Plasma physics
- Electrostatic precipitators
- Medical imaging (e.g., EEG, ECG)

## Technical Details

This simulation uses HTML5 Canvas for rendering and implements:
- Numerical integration for field line tracing
- Color mapping for potential visualization
- Interactive dragging of charges
- Responsive design that works on different screen sizes

The code is open source and available on [GitHub](https://github.com/saskiapoldmaa/saskiapoldmaa.github.io/tree/main/simulations/electric-potential).

## Further Exploration

1. What happens when you make both charges positive or both negative?
2. How does the potential change when you move the charges closer together or further apart?
3. Can you find points where the electric potential is zero? What about points where the electric field is zero?
4. How would you modify this simulation to include more than two charges?

## Related Physics Cup Problems

This simulation can help visualize concepts related to several Physics Cup problems, particularly those involving electrostatics and potential theory.
