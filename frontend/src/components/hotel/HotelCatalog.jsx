import React, { useState } from 'react'
import { CRow, CCol } from '@coreui/react'
import {
  cilPlus,
  cilSave,
  cilPencil,
  cilTrash,
  cilX,
  cilCheckCircle,
  cilBed,
  cilPeople,
  cilCalendar,
  cilBuilding,
  cilSettings,
} from '@coreui/icons'

import {
  HotelButton,
  HotelInput,
  HotelSelect,
  HotelTextarea,
  HotelCard,
  HotelTable,
  HotelBadge,
  HotelModal,
  HotelConfirm,
  HotelAlert,
  HotelPageHeader,
  HotelForm,
  HotelSearch,
  HotelPagination,
  HotelLoader,
  HotelEmpty,
  HotelStatCard,
  HotelLogo,
  HotelPasswordInput,
  HotelCheckbox,
  HotelDateInput,
  HotelFileInput,
  HotelAvatar,
  HotelClientTable,
  HotelEmployeeTable,
  HotelReservationTable,
  HotelPaymentTable,
  HotelRoomCard,
  HotelReservationCard,
  HotelClientCard,
  HotelAuthLayout,
  HotelLoginForm,
  HotelRegisterForm,
} from './index'

const HotelCatalog = () => {
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [tipo, setTipo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const [pagina, setPagina] = useState(1)
  const [modalVisible, setModalVisible] = useState(false)
  const [confirmVisible, setConfirmVisible] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(false)


  // Estados exclusivos de las nuevas demostraciones
  const [passwordPrueba, setPasswordPrueba] = useState('')
  const [casilla, setCasilla] = useState(false)
  const [fecha, setFecha] = useState('2026-12-01')
  const [archivos, setArchivos] = useState([])
  const [loginDemo, setLoginDemo] = useState({ correo: '', password: '', recordarme: false })
  const [registroDemo, setRegistroDemo] = useState({})
  const [erroresRegistro, setErroresRegistro] = useState({})
  const [avisoDemo, setAvisoDemo] = useState('')
  const [accionPendiente, setAccionPendiente] = useState(null)
  const [cargaTablas, setCargaTablas] = useState(false)
  const [tablasVacias, setTablasVacias] = useState(false)

  const cambiarDatos = (setter) => (e) => {
    const { name, type, value, checked } = e.target
    setter((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const accionDemo = (accion) => (registro) => {
    const codigo = registro.codigo ?? registro.nombre ?? registro.numero ?? registro.id
    setAvisoDemo(`${accion}: ${codigo}. Solo demostración; no se modificaron datos reales.`)
  }

  const confirmarDemo = (accion) => (registro) => {
    setAccionPendiente({ accion, registro })
  }

  const clientesDemo = [
    { id: 1, nombre: 'Carlos', apellido: 'Martínez', identidad: 'DEMO-001', correo: 'carlos@example.com', telefono: '9999-0001', nacionalidad: 'Hondureña', fechaRegistro: '2026-11-15', estado: 'Activo', totalReservaciones: 5 },
    { id: 2, nombre: 'Ana', apellido: 'López', identidad: 'DEMO-002', correo: 'ana@example.com', telefono: '9999-0002', estado: 'Inactivo', totalReservaciones: 0 },
    { id: 3, nombre: 'Luis', apellido: 'García', identidad: 'DEMO-003', correo: 'luis@example.com', telefono: '9999-0003', estado: 'Pendiente', totalReservaciones: 1 },
  ]
  const empleadosDemo = [
    { ...clientesDemo[0], cargo: 'Administrador' },
    { ...clientesDemo[1], cargo: 'Recepcionista', estado: 'Activo' },
    { ...clientesDemo[2], cargo: 'Mantenimiento', estado: 'Vacaciones' },
  ]
  const reservacionesDemo = [
    { id: 1, codigo: 'RES-001', cliente: 'Carlos Martínez', habitacion: '201', tipoHabitacion: 'Normal', fechaEntrada: '2026-12-01', fechaSalida: '2026-12-04', huespedes: 2, total: 4500, estado: 'Confirmada' },
    { id: 2, codigo: 'RES-002', cliente: 'Ana López', habitacion: '202', tipoHabitacion: 'Doble', fechaEntrada: '2026-11-26', fechaSalida: '2026-11-29', huespedes: 1, total: 6000, estado: 'Check-in' },
    { id: 3, codigo: 'RES-003', cliente: 'Luis García', habitacion: '203', fechaEntrada: '2026-12-05', fechaSalida: '2026-12-07', huespedes: 2, total: 3000, estado: 'Cancelada' },
  ]
  const pagosDemo = [
    { id: 1, codigo: 'PAG-001', reservacion: 'RES-001', cliente: 'Carlos Martínez', fecha: '2026-11-26', metodoPago: 'Efectivo', referencia: 'DEMO-001', monto: 4500, estado: 'Pagado' },
    { id: 2, codigo: 'PAG-002', reservacion: 'RES-002', cliente: 'Ana López', fecha: '2026-11-26', metodoPago: 'Tarjeta', monto: 6000, estado: 'Pendiente' },
    { id: 3, codigo: 'PAG-003', reservacion: 'RES-003', cliente: 'Luis García', fecha: '2026-11-26', metodoPago: 'Transferencia', monto: 3000, estado: 'Reembolsado' },
  ]
  const cuartosDemo = [
    { id: 1, numero: 201, nombre: 'Habitación estándar', tipo: 'Normal', descripcion: 'Habitación de demostración.', capacidad: 2, precio: 1500, estado: 'Disponible', servicios: ['Wi-Fi', 'TV', 'Aire acondicionado'] },
    { id: 2, numero: 202, nombre: 'Habitación doble', tipo: 'Doble', descripcion: 'Habitación de demostración.', capacidad: 4, precio: 2000, estado: 'Ocupada', servicios: ['Wi-Fi', 'TV'] },
  ]
  const opcionesTabla = { loading: cargaTablas, pageSize: 2 }

  // Datos ficticios para las pruebas
  const habitaciones = [
    { id: 1, numero: 201, tipo: 'Normal', estado: 'Disponible' },
    { id: 2, numero: 202, tipo: 'Doble', estado: 'Ocupada' },
    { id: 3, numero: 203, tipo: 'Business', estado: 'Reservada' },
    { id: 4, numero: 204, tipo: 'Suite', estado: 'Mantenimiento' },
    { id: 5, numero: 205, tipo: 'Normal', estado: 'Disponible' },
    { id: 6, numero: 206, tipo: 'Suite', estado: 'Disponible' },
  ]

  const coloresEstado = {
    Disponible: 'success',
    Ocupada: 'danger',
    Reservada: 'info',
    Mantenimiento: 'warning',
  }

  const registrosPorPagina = 3

  const habitacionesFiltradas = habitaciones.filter((habitacion) =>
    `${habitacion.numero} ${habitacion.tipo} ${habitacion.estado}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  )

  const habitacionesVisibles = habitacionesFiltradas.slice(
    (pagina - 1) * registrosPorPagina,
    pagina * registrosPorPagina
  )

  const columns = [
    {
      key: 'numero',
      label: 'Habitación',
    },
    {
      key: 'tipo',
      label: 'Tipo',
    },
    {
      key: 'estado',
      label: 'Estado',
      render: (habitacion) => (
        <HotelBadge color={coloresEstado[habitacion.estado]}>
          {habitacion.estado}
        </HotelBadge>
      ),
    },
    {
      key: 'acciones',
      label: 'Acciones',
      render: () => (
        <div className="hotel-table-actions">
          <HotelButton
            size="sm"
            variant="outline"
            icon={cilPencil}
            onClick={() => setModalVisible(true)}
          >
            Modificar
          </HotelButton>

          <HotelButton
            size="sm"
            color="danger"
            variant="outline"
            icon={cilTrash}
            onClick={() => setConfirmVisible(true)}
          >
            Eliminar
          </HotelButton>
        </div>
      ),
    },
  ]

  const limpiarFormulario = () => {
    setNombre('')
    setCorreo('')
    setTipo('')
    setDescripcion('')
  }

  return (
    <>
      <HotelPageHeader
        title="Catálogo de componentes"
        description="Biblioteca visual del Gran Hotel el Toro"
        icon={cilSettings}
      />

      {mensaje && (
        <HotelAlert
          color="success"
          title="Prueba realizada"
          dismissible
          onClose={() => setMensaje('')}
        >
          {mensaje}
        </HotelAlert>
      )}

      {/* 1. TARJETAS DE ESTADISTICAS */}

      <h2 className="h5 mb-3">Tarjetas de estadísticas</h2>

      <CRow className="g-3 mb-4">
        <CCol sm={6} xl={3}>
          <HotelStatCard
            title="Habitaciones"
            value={80}
            icon={cilBed}
            color="primary"
          />
        </CCol>

        <CCol sm={6} xl={3}>
          <HotelStatCard
            title="Disponibles"
            value={32}
            icon={cilCheckCircle}
            color="success"
          />
        </CCol>

        <CCol sm={6} xl={3}>
          <HotelStatCard
            title="Clientes"
            value={125}
            icon={cilPeople}
            color="info"
          />
        </CCol>

        <CCol sm={6} xl={3}>
          <HotelStatCard
            title="Reservaciones"
            value={28}
            icon={cilCalendar}
            color="warning"
          />
        </CCol>
      </CRow>

      {/* 2. BOTONES */}

      <HotelCard
        title="Botones"
        subtitle="HotelButton"
        className="mb-4"
      >
        <div className="d-flex flex-wrap gap-3">
          <HotelButton icon={cilPlus}>
            Crear
          </HotelButton>

          <HotelButton icon={cilSave}>
            Guardar
          </HotelButton>

          <HotelButton variant="outline" icon={cilPencil}>
            Modificar
          </HotelButton>

          <HotelButton color="danger" icon={cilTrash}>
            Eliminar
          </HotelButton>

          <HotelButton
            color="secondary"
            variant="outline"
            icon={cilX}
          >
            Cancelar
          </HotelButton>

          <HotelButton loading>
            Procesando
          </HotelButton>

          <HotelButton disabled>
            Deshabilitado
          </HotelButton>
        </div>

        <hr />

        <div className="d-flex flex-wrap align-items-center gap-3">
          <HotelButton size="sm">Pequeño</HotelButton>
          <HotelButton>Normal</HotelButton>
          <HotelButton size="lg">Grande</HotelButton>
        </div>
      </HotelCard>

      {/* 3. FORMULARIOS */}

      <HotelForm
        title="Formulario de prueba"
        subtitle="HotelForm, HotelInput, HotelSelect y HotelTextarea"
        className="mb-4"
        onCancel={limpiarFormulario}
        onSubmit={(e) => {
          e.preventDefault()
          setMensaje('Formulario de prueba enviado correctamente.')
        }}
      >
        <CRow className="g-3">
          <CCol md={6}>
            <HotelInput
              label="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingrese el nombre"
              required
            />
          </CCol>

          <CCol md={6}>
            <HotelInput
              label="Correo electrónico"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="correo@ejemplo.com"
              required
            />
          </CCol>

          <CCol md={6}>
            <HotelInput
              label="Número de habitación"
              type="number"
              placeholder="204"
              min={100}
              max={999}
            />
          </CCol>

          <CCol md={6}>
            <HotelSelect
              label="Tipo de habitación"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
            >
              <option value="" disabled>
                Seleccione un tipo
              </option>
              <option value="1">Normal</option>
              <option value="2">Doble</option>
              <option value="3">Business</option>
              <option value="4">Suite</option>
            </HotelSelect>
          </CCol>

          <CCol md={6}>
            <HotelInput
              label="Campo con error"
              error="Este campo contiene un error de ejemplo."
            />
          </CCol>

          <CCol md={6}>
            <HotelInput
              label="Campo deshabilitado"
              value="HT-001"
              disabled
            />
          </CCol>

          <CCol xs={12}>
            <HotelTextarea
              label="Observaciones"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Escriba una descripción..."
              maxLength={500}
              showCount
              helpText="Máximo 500 caracteres."
            />
          </CCol>
        </CRow>
      </HotelForm>

      {/* 4. ETIQUETAS DE ESTADO */}

      <HotelCard
        title="Indicadores de estado"
        subtitle="HotelBadge"
        className="mb-4"
      >
        <div className="d-flex flex-wrap gap-3">
          <HotelBadge color="success">Disponible</HotelBadge>
          <HotelBadge color="danger">Ocupada</HotelBadge>
          <HotelBadge color="info">Reservada</HotelBadge>
          <HotelBadge color="warning">Mantenimiento</HotelBadge>
          <HotelBadge color="secondary">Pendiente</HotelBadge>
          <HotelBadge color="primary">Confirmada</HotelBadge>
        </div>

        <hr />

        <div className="d-flex flex-wrap gap-3">
          <HotelBadge color="success" soft={false}>
            Disponible
          </HotelBadge>

          <HotelBadge color="danger" soft={false}>
            Cancelada
          </HotelBadge>

          <HotelBadge color="primary" pill>
            Confirmada
          </HotelBadge>
        </div>
      </HotelCard>

      {/* 5. TABLAS, BUSQUEDA Y PAGINACION */}

      <HotelCard
        title="Tabla de habitaciones"
        subtitle="HotelTable, HotelSearch y HotelPagination"
        className="mb-4"
      >
        <div className="mb-3">
          <HotelSearch
            placeholder="Buscar habitación..."
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value)
              setPagina(1)
            }}
            onClear={() => {
              setBusqueda('')
              setPagina(1)
            }}
          />
        </div>

        <HotelTable
          columns={columns}
          data={habitacionesVisibles}
          rowKey="id"
          emptyMessage="No se encontraron habitaciones."
        />

        <HotelPagination
          currentPage={pagina}
          totalItems={habitacionesFiltradas.length}
          pageSize={registrosPorPagina}
          onPageChange={setPagina}
        />
      </HotelCard>

      {/* 6. ALERTAS */}

      <HotelCard
        title="Mensajes del sistema"
        subtitle="HotelAlert"
        className="mb-4"
      >
        <HotelAlert color="success" title="Operación exitosa">
          Registro guardado correctamente.
        </HotelAlert>

        <HotelAlert color="danger" title="Error">
          No fue posible guardar el registro.
        </HotelAlert>

        <HotelAlert color="warning" title="Advertencia">
          La habitación se encuentra en mantenimiento.
        </HotelAlert>

        <HotelAlert color="info" title="Información">
          Seleccione una habitación disponible.
        </HotelAlert>
      </HotelCard>

      {/* 7. VENTANAS EMERGENTES */}

      <HotelCard
        title="Ventanas emergentes"
        subtitle="HotelModal y HotelConfirm"
        className="mb-4"
      >
        <div className="d-flex flex-wrap gap-3">
          <HotelButton onClick={() => setModalVisible(true)}>
            Abrir ventana
          </HotelButton>

          <HotelButton
            color="danger"
            icon={cilTrash}
            onClick={() => setConfirmVisible(true)}
          >
            Probar confirmación
          </HotelButton>
        </div>
      </HotelCard>

      {/* 8. INDICADORES DE CARGA */}

      <HotelCard
        title="Indicadores de carga"
        subtitle="HotelLoader"
        className="mb-4"
      >
        <HotelButton
          variant="outline"
          onClick={() => setCargando(!cargando)}
        >
          {cargando ? 'Ocultar carga' : 'Mostrar carga'}
        </HotelButton>

        <HotelLoader
          visible={cargando}
          message="Cargando información..."
        />

        <CRow className="mt-3">
          <CCol md={4}>
            <HotelLoader size="small" message="Pequeño" />
          </CCol>

          <CCol md={4}>
            <HotelLoader message="Normal" />
          </CCol>

          <CCol md={4}>
            <HotelLoader size="large" message="Grande" />
          </CCol>
        </CRow>
      </HotelCard>

      {/* 9. ESTADOS VACIOS */}

      <HotelCard
        title="Estados vacíos"
        subtitle="HotelEmpty"
        className="mb-4"
      >
        <HotelEmpty
          title="No hay habitaciones registradas"
          description="Agregue una habitación para comenzar."
          actionText="Crear habitación"
          onAction={() => setModalVisible(true)}
        />
      </HotelCard>

      {/* 10. TARJETAS GENERALES */}

      <CRow className="g-3 mb-4">
        <CCol md={6}>
          <HotelCard
            title="Información del hotel"
            subtitle="HotelCard"
            hoverable
          >
            <p>Nombre: Gran Hotel el Toro</p>
            <p>Módulo: Administración</p>
            <HotelBadge color="success">Activo</HotelBadge>
          </HotelCard>
        </CCol>

        <CCol md={6}>
          <HotelCard
            title="Información de pisos"
            subtitle="Ejemplo de tarjeta"
            hoverable
            footer={
              <HotelButton
                icon={cilBuilding}
                onClick={() => setModalVisible(true)}
              >
                Ver información
              </HotelButton>
            }
          >
            <p>Piso: 1</p>
            <p>Capacidad: 20 habitaciones</p>
          </HotelCard>
        </CCol>
      </CRow>

      {/* 11. LOGO Y AVATARES */}
      <HotelCard title="Identidad visual" subtitle="HotelLogo y HotelAvatar" className="mb-4">
        <div className="d-flex flex-wrap align-items-center gap-4">
          <HotelLogo size="small" />
          <HotelLogo size="medium" />
          <HotelLogo size="large" />
          <HotelAvatar name="Carlos Martínez" size="sm" />
          <HotelAvatar name="Ana López" size="md" color="info" status="online" />
          <HotelAvatar name="Luis García" size="lg" color="success" status="away" />
          <HotelAvatar name="Usuario de prueba" size="xl" src="/imagen-demo-inexistente.png" status="offline" />
        </div>
      </HotelCard>

      {/* 12. CAMPOS ADICIONALES */}
      <HotelCard title="Campos adicionales" subtitle="HotelPasswordInput, HotelCheckbox, HotelDateInput y HotelFileInput" className="mb-4">
        <CRow className="g-3">
          <CCol md={6}>
            <HotelPasswordInput label="Contraseña de prueba" value={passwordPrueba} onChange={(e) => setPasswordPrueba(e.target.value)} helpText="Usa una contraseña ficticia." />
          </CCol>
          <CCol md={6}>
            <HotelDateInput label="Fecha de entrada" value={fecha} onChange={(e) => setFecha(e.target.value)} min="2026-12-01" />
          </CCol>
          <CCol md={6}>
            <HotelCheckbox label="Desayuno incluido" checked={casilla} onChange={(e) => setCasilla(e.target.checked)} />
            <HotelCheckbox label="Casilla deshabilitada" checked disabled />
          </CCol>
          <CCol md={6}>
            <HotelFileInput label="Fotografías de prueba" accept="image/*" multiple onChange={(e) => setArchivos(Array.from(e.target.files || []).map((f) => f.name))} helpText="Los archivos no se subirán al servidor." />
            <p className="small mt-2">{archivos.length ? archivos.join(', ') : 'Ningún archivo seleccionado'}</p>
          </CCol>
        </CRow>
      </HotelCard>

      {/* 13. TABLAS ESPECIALIZADAS */}
      <HotelAlert color="info" title="Datos ficticios">Las siguientes pruebas no están conectadas a MySQL.</HotelAlert>
      {avisoDemo && (
        <HotelAlert color="success" dismissible onClose={() => setAvisoDemo('')}>
          {avisoDemo}
        </HotelAlert>
      )}
      <div className="d-flex flex-wrap gap-2 mb-3">
        <HotelButton variant="outline" onClick={() => setCargaTablas((v) => !v)}>{cargaTablas ? 'Finalizar carga' : 'Simular carga de tablas'}</HotelButton>
        <HotelButton variant="outline" onClick={() => setTablasVacias((v) => !v)}>{tablasVacias ? 'Restaurar datos' : 'Probar tablas vacías'}</HotelButton>
      </div>
      <HotelCard title="Clientes" subtitle="HotelClientTable" className="mb-4">
        <HotelClientTable clientes={tablasVacias ? [] : clientesDemo} {...opcionesTabla} onView={accionDemo('Ver cliente')} onEdit={accionDemo('Modificar cliente')} onDelete={confirmarDemo('Eliminar cliente')} />
      </HotelCard>
      <HotelCard title="Empleados" subtitle="HotelEmployeeTable" className="mb-4">
        <HotelEmployeeTable empleados={tablasVacias ? [] : empleadosDemo} {...opcionesTabla} onView={accionDemo('Ver empleado')} onEdit={accionDemo('Modificar empleado')} onDelete={confirmarDemo('Eliminar empleado')} />
      </HotelCard>
      <HotelCard title="Reservaciones" subtitle="HotelReservationTable" className="mb-4">
        <HotelReservationTable reservaciones={tablasVacias ? [] : reservacionesDemo} {...opcionesTabla} onView={accionDemo('Ver reservación')} onEdit={accionDemo('Modificar reservación')} onCancel={confirmarDemo('Cancelar reservación')} onCheckIn={accionDemo('Check-in')} onCheckOut={accionDemo('Check-out')} />
      </HotelCard>
      <HotelCard title="Pagos" subtitle="HotelPaymentTable" className="mb-4">
        <HotelPaymentTable pagos={tablasVacias ? [] : pagosDemo} {...opcionesTabla} onView={accionDemo('Ver pago')} onReceipt={accionDemo('Ver comprobante')} onRefund={confirmarDemo('Reembolsar pago')} />
      </HotelCard>

      {/* 14. TARJETAS ESPECIALIZADAS */}
      <h2 className="h5 mb-3">Tarjetas de habitaciones (HotelRoomCard)</h2>
      <CRow className="g-3 mb-4">
        {cuartosDemo.map((habitacion) => (
          <CCol key={habitacion.id} md={6}>
            <HotelRoomCard habitacion={habitacion} onView={accionDemo('Ver habitación')} onReserve={accionDemo('Reservar habitación')} onEdit={accionDemo('Modificar habitación')} />
          </CCol>
        ))}
      </CRow>
      <h2 className="h5 mb-3">Tarjetas de reservaciones (HotelReservationCard)</h2>
      <CRow className="g-3 mb-4">
        {reservacionesDemo.map((reservacion) => (
          <CCol key={reservacion.id} md={6} xl={4}>
            <HotelReservationCard reservacion={reservacion} onView={accionDemo('Ver reservación')} onEdit={accionDemo('Modificar reservación')} onCancel={confirmarDemo('Cancelar reservación')} />
          </CCol>
        ))}
      </CRow>
      <h2 className="h5 mb-3">Tarjetas de clientes (HotelClientCard)</h2>
      <CRow className="g-3 mb-4">
        {clientesDemo.slice(0, 2).map((cliente) => (
          <CCol key={cliente.id} md={6}>
            <HotelClientCard cliente={cliente} onView={accionDemo('Ver perfil')} onEdit={accionDemo('Modificar perfil')} showIdentity={cliente.id === 1} />
          </CCol>
        ))}
      </CRow>

      {/* 15. AUTENTICACION: DEMOSTRACION SIN BACKEND */}
      <HotelCard title="Autenticación de prueba" subtitle="HotelAuthLayout, HotelLoginForm y HotelRegisterForm" className="mb-4">
        <HotelAlert color="warning">Utiliza solamente datos ficticios. No se enviarán credenciales al servidor.</HotelAlert>
        <HotelAuthLayout title="Iniciar sesión" subtitle="Formulario de demostración">
          <HotelLoginForm values={loginDemo} onChange={cambiarDatos(setLoginDemo)} showRemember onSubmit={() => { setLoginDemo((v) => ({ ...v, password: '' })); setAvisoDemo('Inicio de sesión de prueba: no se autenticó ningún usuario.') }} onForgotPassword={() => setAvisoDemo('Recuperación de contraseña: solo demostración.')} onRegister={() => setAvisoDemo('El formulario de registro de prueba está debajo.')} />
        </HotelAuthLayout>
        <HotelAuthLayout title="Crear cuenta" subtitle="Registro de demostración" maxWidth={600}>
          <HotelRegisterForm values={registroDemo} errors={erroresRegistro} onChange={cambiarDatos(setRegistroDemo)} showTerms onTerms={() => setAvisoDemo('Términos de ejemplo: no hay contrato real.')} onLogin={() => setAvisoDemo('El formulario de inicio de sesión de prueba está arriba.')} onSubmit={() => {
            if (registroDemo.password !== registroDemo.confirmarPassword) {
              setErroresRegistro({ confirmarPassword: 'Las contraseñas no coinciden.' })
              return
            }
            setErroresRegistro({})
            setRegistroDemo({})
            setAvisoDemo('Registro de prueba enviado. No se creó ninguna cuenta.')
          }} />
        </HotelAuthLayout>
        {avisoDemo && <HotelAlert color="info">{avisoDemo}</HotelAlert>}
      </HotelCard>

      <HotelConfirm visible={Boolean(accionPendiente)} onClose={() => setAccionPendiente(null)} title={accionPendiente?.accion || 'Confirmar'} message="¿Deseas realizar esta acción de demostración?" confirmText="Confirmar" onConfirm={() => {
        if (accionPendiente) accionDemo(accionPendiente.accion)(accionPendiente.registro)
        setAccionPendiente(null)
      }}>
        No se modificará ningún dato real.
      </HotelConfirm>

      {/* VENTANA DE PRUEBA */}

      <HotelModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Ventana de prueba"
        subtitle="Componente HotelModal"
        footer={
          <HotelButton
            color="secondary"
            variant="outline"
            onClick={() => setModalVisible(false)}
          >
            Cerrar
          </HotelButton>
        }
      >
        <p>
          Esta ventana permite comprobar el funcionamiento
          del componente en ambos temas.
        </p>
      </HotelModal>

      {/* CONFIRMACION DE PRUEBA */}

<HotelConfirm
  visible={confirmVisible}
  onClose={() => setConfirmVisible(false)}
  onConfirm={() => {
    setConfirmVisible(false)
    setMensaje('Confirmación de prueba realizada correctamente.')
  }}
                   title="Eliminar registro"
     message="¿Está seguro de realizar esta operación?"
  confirmText="Eliminar"
  color="danger"
  icon={cilTrash}
  confirmIcon={cilTrash}
       >
          Esta es una demostración. No se eliminarán datos reales.
       </HotelConfirm>
    </>
  )
}

export default HotelCatalog
